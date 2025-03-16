
export interface IncidentData {
  clinic: string;
  department: string;
  room: string;
  phone: string;
  description: string;
  priority: string;
}

export const validateIncidentData = (data: Partial<IncidentData>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Check if clinic is selected
  if (!data.clinic) {
    errors.clinic = "Please select a clinic";
  }

  // Check if department is selected
  if (!data.department) {
    errors.department = "Please select a department";
  }

  // Check if room is provided
  if (!data.room) {
    errors.room = "Please provide a room or office location";
  }

  // Validate phone number format
  if (!data.phone) {
    errors.phone = "Please provide a contact phone number";
  } else if (!/^(\+\d{1,3}[- ]?)?\d{9,15}$/.test(data.phone)) {
    errors.phone = "Please provide a valid phone number";
  }

  // Check if description is provided and has minimum length
  if (!data.description) {
    errors.description = "Please provide a problem description";
  } else if (data.description.length < 10) {
    errors.description = "Please provide a more detailed description (at least 10 characters)";
  }

  // Check if priority is selected
  if (!data.priority) {
    errors.priority = "Please select a priority level";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getIncidentFormDefaults = (): Partial<IncidentData> => {
  return {
    clinic: "",
    department: "",
    room: "",
    phone: "",
    description: "",
    priority: ""
  };
};

export const CLINICS = [
  { id: "clinic1", name: "Main Medical Center" },
  { id: "clinic2", name: "North Wellness Clinic" },
  { id: "clinic3", name: "Westside Health Facility" },
  { id: "clinic4", name: "Downtown Medical Plaza" }
];

export const DEPARTMENTS = [
  { id: "dept1", name: "Reception" },
  { id: "dept2", name: "Administration" },
  { id: "dept3", name: "General Practice" },
  { id: "dept4", name: "Pediatrics" },
  { id: "dept5", name: "Cardiology" },
  { id: "dept6", name: "Orthopedics" },
  { id: "dept7", name: "Laboratory" },
  { id: "dept8", name: "Radiology" },
  { id: "dept9", name: "Pharmacy" }
];

export const PRIORITIES = [
  { id: "low", name: "Low", description: "Non-urgent issue, can be addressed when convenient" },
  { id: "medium", name: "Medium", description: "Important but not time-sensitive" },
  { id: "high", name: "High", description: "Requires prompt attention" },
  { id: "urgent", name: "Urgent", description: "Critical issue requiring immediate resolution" }
];
