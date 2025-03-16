
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import { CLINICS, DEPARTMENTS, PRIORITIES, IncidentData, validateIncidentData } from '@/utils/validation';
import { submitIncidentToN8n } from '@/utils/n8nIntegration';

interface IncidentFormProps {
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmitSuccess, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<IncidentData>>({
    clinic: "",
    department: "",
    room: "",
    phone: "",
    description: "",
    priority: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field if there was one
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const validation = validateIncidentData(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please check your submission",
        description: "Some information is missing or incorrect. Please review the form.",
        variant: "destructive",
      });
      return;
    }
    
    if (!confirming) {
      setConfirming(true);
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await submitIncidentToN8n(formData as IncidentData);
    
    setIsSubmitting(false);
    
    if (success) {
      onSubmitSuccess();
    }
  };

  const handleBack = () => {
    if (confirming) {
      setConfirming(false);
    } else {
      onCancel();
    }
  };

  const getSelectedName = (id: string, options: {id: string, name: string}[]) => {
    return options.find(option => option.id === id)?.name || "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-6 animate-scale-in">
      <h2 className="text-xl font-semibold mb-6">
        {confirming ? "Confirm Incident Details" : "Submit an IT Support Incident"}
      </h2>
      
      {confirming ? (
        <div className="space-y-4 mb-6">
          <p className="text-muted-foreground mb-4">Please review your incident details before submitting:</p>
          
          <div className="glass-panel-dark p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm text-muted-foreground">Clinic:</p>
              <p className="text-sm font-medium">{getSelectedName(formData.clinic || "", CLINICS)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm text-muted-foreground">Department:</p>
              <p className="text-sm font-medium">{getSelectedName(formData.department || "", DEPARTMENTS)}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm text-muted-foreground">Room/Office:</p>
              <p className="text-sm font-medium">{formData.room}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm text-muted-foreground">Phone Number:</p>
              <p className="text-sm font-medium">{formData.phone}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm text-muted-foreground">Priority:</p>
              <p className="text-sm font-medium">{getSelectedName(formData.priority || "", PRIORITIES)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Problem Description:</p>
            <div className="glass-panel-dark p-4 rounded-xl">
              <p className="text-sm">{formData.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="clinic" className="block text-sm font-medium mb-1">
                Clinic
              </label>
              <select
                id="clinic"
                name="clinic"
                value={formData.clinic}
                onChange={handleInputChange}
                className={`select-field ${errors.clinic ? 'border-destructive ring-destructive/10' : ''}`}
              >
                <option value="" disabled>Select clinic</option>
                {CLINICS.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
              {errors.clinic && (
                <p className="text-destructive text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" /> {errors.clinic}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`select-field ${errors.department ? 'border-destructive ring-destructive/10' : ''}`}
              >
                <option value="" disabled>Select department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-destructive text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" /> {errors.department}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="room" className="block text-sm font-medium mb-1">
                Room/Office
              </label>
              <input
                id="room"
                name="room"
                type="text"
                value={formData.room}
                onChange={handleInputChange}
                placeholder="e.g., Room 302, Reception Desk"
                className={`input-field ${errors.room ? 'border-destructive ring-destructive/10' : ''}`}
              />
              {errors.room && (
                <p className="text-destructive text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" /> {errors.room}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., +1234567890"
                className={`input-field ${errors.phone ? 'border-destructive ring-destructive/10' : ''}`}
              />
              {errors.phone && (
                <p className="text-destructive text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={`select-field ${errors.priority ? 'border-destructive ring-destructive/10' : ''}`}
            >
              <option value="" disabled>Select priority</option>
              {PRIORITIES.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name} - {priority.description}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" /> {errors.priority}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Problem Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Please describe the issue in detail"
              className={`input-field resize-none ${errors.description ? 'border-destructive ring-destructive/10' : ''}`}
            />
            {errors.description && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" /> {errors.description}
              </p>
            )}
          </div>
        </form>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          {confirming ? "Back to Edit" : "Cancel"}
        </button>
        
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Submitting...
            </>
          ) : confirming ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              Submit Incident
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-2" />
              Review Details
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IncidentForm;
