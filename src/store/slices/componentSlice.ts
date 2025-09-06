// // src/store/componentSlice.ts

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the shape of a single property
// interface Property {
//   name: string;
//   defaultValue: string;
//   dataType: string;
// }

// // Define the shape of a created component
// export interface Component {
//   id: string;
//   name: string;
//   properties: Property[];
// }

// // Define the shape of our slice's state
// interface ComponentState {
//   staticComponents: Component[];
//   dynamicComponents: Component[];
// }

// const initialState: ComponentState = {
//   staticComponents: [],
//   dynamicComponents: [],
// };

// export const componentSlice = createSlice({
//   name: "components",
//   initialState,
//   reducers: {
//     addStaticComponent: (state, action: PayloadAction<Component>) => {
//       state.staticComponents.push(action.payload);
//     },
//     addDynamicComponent: (state, action: PayloadAction<Component>) => {
//       state.dynamicComponents.push(action.payload);
//     },
//   },
// });

// // Export the actions
// export const { addStaticComponent, addDynamicComponent } = componentSlice.actions;

// // Export the reducer
// export default componentSlice.reducer;