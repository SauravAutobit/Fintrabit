import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../services/socketService';

// Define the shape of our data
export interface Property {
  key: string;
  datatype: string;
  default: string;
  length?: string;
  length_type?: string;
}

export interface ComponentData {
  id: string;
  name: string;
  properties: Array<{
    key: string;
    datatype: string;
    default: string;
    length: string;
    length_type: string;
  }>;
  type: 'static' | 'dinamic';
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface ComponentsState {
  static: {
    data: ComponentData[];
    status: Status;
  };
  dinamic: {
    data: ComponentData[];
    status: Status;
  };
  error: string | null;
}

const initialState: ComponentsState = {
  static: {
    data: [],
    status: 'idle', // 'idle' means we haven't fetched yet
  },
  dinamic: {
    data: [],
    status: 'idle',
  },
  error: null,
};

// Create an async thunk for fetching data
// This will automatically handle pending/fulfilled/rejected actions
export const fetchComponentsByType = createAsyncThunk(
  'components/fetchByType',
  async (componentType: 'static' | 'dinamic') => {
    const payload = {
      query: `fintrabit.instrument_categories[type="${componentType}"]`,
    };
    const response = await apiClient.send<ComponentData[]>('fetch', payload);
    return response.data || [];
  }
);


export const updateComponent = createAsyncThunk(
  'components/update',
  async (component: ComponentData) => {
    const targetUrl =
      component.type === 'static'
        ? 'instrument/category/update'
        : 'instrument/category/dinamic/update';

    // The payload for the update API might not need the 'type'
    // const { type, ...payload } = component;

    //  const payload = {
    //   id: component.id,
    //   name: component.name,
    //   properties: component.properties,
    // };
    
    await apiClient.send(targetUrl, component);
    
    // Return the updated component so we can update the state
    return component;
  }
);

// ✅ NEW: Thunk for deleting a component
export const deleteComponentById = createAsyncThunk(
  'components/delete',
  async (args: { component: ComponentData; componentType: 'static' | 'dinamic' }) => {
    const { component, componentType } = args;
    const targetUrl =
      componentType === 'static'
        ? 'instrument/category/delete'
        : 'instrument/category/dinamic/delete';
    console.log("component", component)
    await apiClient.send(targetUrl, { id: component.id });

    // Return the ID of the deleted component so we can remove it from state
    return component.id;
  }
);

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // This reducer will let us add a new component directly to the state
    addComponent: (state, action: PayloadAction<ComponentData>) => {
      console.log("action", action)
        if (action.payload.type === 'static') {
        // console.log("stataic", action)
        state.static.data.push(action.payload);
      } else {
        // console.log("dinamic", action)
        state.dinamic.data.push(action.payload);
      }

 
    },

      // ✅ NEW: A reducer to handle local, temporary edits before saving
    editLocalComponent: (state, action: PayloadAction<ComponentData>) => {
      const componentToUpdate = action.payload;
      const componentList = state[componentToUpdate.type].data;
      const index = componentList.findIndex(c => c.id === componentToUpdate.id);
      if (index !== -1) {
        state[componentToUpdate.type].data[index] = componentToUpdate;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComponentsByType.pending, (state, action) => {
        const type = action.meta.arg; // 'static' or 'dinamic'
        state[type].status = 'loading';
      })
      .addCase(fetchComponentsByType.fulfilled, (state, action) => {
        const type = action.meta.arg;
        state[type].status = 'succeeded';
        state[type].data = action.payload;
      })
      .addCase(fetchComponentsByType.rejected, (state, action) => {
        const type = action.meta.arg;
        state[type].status = 'failed';
        state.error = action.error.message || 'Failed to fetch components';
      })

       // ✅ Handle the update thunk
    .addCase(updateComponent.fulfilled, (state, action) => {
        const updatedComponent = action.payload;
        const componentList = state[updatedComponent.type].data;
        const index = componentList.findIndex(c => c.id === updatedComponent.id);
        if (index !== -1) {
          state[updatedComponent.type].data[index] = updatedComponent;
        }
      })
       // ✅ Handle the delete thunk
      .addCase(deleteComponentById.fulfilled, (state, action) => {
        const deletedId = action.payload;
        const type = action.meta.arg.componentType; // 'static' or 'dinamic'
        state[type].data = state[type].data.filter(c => c.id !== deletedId);
      });
  },
});

export const { addComponent, editLocalComponent  } = componentsSlice.actions;

export default componentsSlice.reducer;