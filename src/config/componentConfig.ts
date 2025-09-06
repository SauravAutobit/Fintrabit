// src/config/componentConfig.ts

// Defines a single form field
export interface FormField {
  id: string; // e.g., 'name', 'length'
  label: string;
  type: 'text' | 'number' | 'select'; // Input type
  placeholder: string;
  options?: string[]; // For select/dropdown fields
}

// Defines a row of fields for layout
export interface FormRow {
  fields: FormField[];
}

// Main configuration object
export const componentTypes = {
  static: {
    title: "Create Static Component",
    formLayout: [
      // Row 1
      {
        fields: [
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter Key' },
          { id: 'defaultValue', label: 'Default Value', type: 'text', placeholder: 'Enter Default Value' },
        ],
      },
      // Row 2
      {
        fields: [
          { id: 'dataType', label: 'Data Type', type: 'text', placeholder: 'Enter Type' },
        ],
      },
    ] as FormRow[],
  },
  dynamic: {
    title: "Create Dynamic Group",
    formLayout: [
      // Row 1
      {
        fields: [
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter Key' },
          { id: 'length', label: 'Length', type: 'number', placeholder: 'Enter Default Value' },
        ],
      },
      // Row 2
      {
        fields: [
          { id: 'dataType', label: 'Data Type', type: 'text', placeholder: 'Enter Type' },
          { 
            id: 'lengthType', 
            label: 'Length Type', 
            type: 'select', 
            placeholder: 'Select Data Type',
            options: ['Fixed', 'Variable'] // Dropdown options
          },
        ],
      },
    ] as FormRow[],
  },
};