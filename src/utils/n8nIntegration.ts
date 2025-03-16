
import { toast } from "@/hooks/use-toast";
import { IncidentData } from "./validation";

// This would typically point to an n8n webhook URL
// For demonstration purposes, we'll use a placeholder
const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/incident-submission";

export const submitIncidentToN8n = async (incidentData: IncidentData): Promise<boolean> => {
  try {
    console.log("Submitting incident to n8n:", incidentData);
    
    // In a real implementation, this would be an actual API call to the n8n webhook
    // For demonstration, we'll simulate a successful submission
    // const response = await fetch(N8N_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...incidentData,
    //     timestamp: new Date().toISOString(),
    //   }),
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Failed to submit incident: ${response.statusText}`);
    // }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    toast({
      title: "Incident Submitted",
      description: "Your IT support request has been sent successfully.",
    });
    
    return true;
  } catch (error) {
    console.error("Error submitting incident:", error);
    
    // Show error toast
    toast({
      title: "Submission Failed",
      description: "There was an error submitting your incident. Please try again.",
      variant: "destructive",
    });
    
    return false;
  }
};
