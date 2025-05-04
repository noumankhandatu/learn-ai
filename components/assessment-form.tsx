"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  emailAddress: z.string().email({ message: "Valid email is required" }),
  employmentStatus: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  aiBackground: z.enum(["Yes - AI", "Yes - Technical (but not AI)", "No - Neither AI nor technical background"], {
    required_error: "Please select an option",
  }),
  aiKnowledge: z.enum(["I've only used tools like ChatGPT", "I'm currently building or experimenting with AI", "None or very little experience"], {
    required_error: "Please select an option",
  }),
  priorTraining: z.string().min(1, { message: "This field is required" }),
  biggestChallenge: z.string().min(1, { message: "This field is required" }),
  holdingBack: z.string().min(1, { message: "This field is required" }),
  desiredOutcome: z.string().min(1, { message: "This field is required" }),
  financialSituation: z.enum(
    [
      "I have less than $1,000 across all my accounts",
      "I have access to financial resources for this AI coaching program (over $1000 across all my accounts)",
      "I have access to financial resources and would like to learn more about payment plan options (over $1000 across all my accounts)",
    ],
    { required_error: "Please select an option" }
  ),
  agreeToBeFocused: z.enum(["Yes, I agree and will be present, prepared, and in a quiet space at the scheduled time", "No"], {
    required_error: "Please select an option",
  }),
});

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
    eligible: boolean;
    applicationId?: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emailAddress: "",
      occupation: "",
      priorTraining: "",
      biggestChallenge: "",
      holdingBack: "",
      desiredOutcome: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setApiResponse(null); // Reset previous response

    try {
      // Prepare the payload
      const formData = {
        personalInfo: {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          emailAddress: values.emailAddress,
        },
        professionalBackground: {
          employmentStatus: values.employmentStatus,
          occupation: values.occupation,
        },
        aiExperience: {
          aiBackground: values.aiBackground,
          aiKnowledge: values.aiKnowledge,
          priorTraining: values.priorTraining,
        },
        goalsAndChallenges: {
          biggestChallenge: values.biggestChallenge,
          holdingBack: values.holdingBack,
          desiredOutcome: values.desiredOutcome,
        },
        commitmentAssessment: {
          financialSituation: values.financialSituation,
        },
        professionalEtiquette: {
          agreeToBeFocused: values.agreeToBeFocused,
        },
        submittedAt: new Date().toISOString(),
      };

      // Send the data to the API
      const response = await axios.post("/api/eligibility", formData);

      // Store the API response
      setApiResponse(response.data);

      toast({
        title: response.data.eligible ? "Application Approved!" : "Application Status",
        description: "Please check below for details about your application.",
        variant: "default",
      });

      // Don't reset the form so user can see what they submitted
      // form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);

      if (axios.isAxiosError(error) && error.response) {
        // Handle specific API error responses
        toast({
          title: "Submission failed",
          description: error.response.data.message || "There was an error processing your application. Please try again.",
          variant: "destructive",
        });
      } else {
        // Handle generic errors
        toast({
          title: "Submission failed",
          description: "There was an error connecting to our servers. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function onError(errors: any) {
    console.log(errors);
    toast({
      title: "Error in form submission",
      description: "Please check the form for errors and try again.",
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Application - <span style={{ color: "#1e90ff" }}>LEARN</span>
          <span style={{ color: "#ff7f50" }}>AI</span> Coaching Accelerator{" "}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-500">Personal Information</h2>
            <hr />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    1. First Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    2. Last Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    3. Phone Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    4. Email Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Professional Background Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-500">Professional Background</h2>
            <hr />
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    5. Are you employed full-time? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="No" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    6. Occupation <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* AI Experience Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-500">AI Experience</h2>
            <hr />

            <FormField
              control={form.control}
              name="aiBackground"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>
                    7. Do you have any AI or technical background? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                      <FormItem className="flex items-center space-x-3 space-y-2">
                        <FormControl>
                          <RadioGroupItem value="Yes - AI" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes - AI</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-2">
                        <FormControl>
                          <RadioGroupItem value="Yes - Technical (but not AI)" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes - Technical (but not AI)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-2">
                        <FormControl>
                          <RadioGroupItem value="No - Neither AI nor technical background" />
                        </FormControl>
                        <FormLabel className="font-normal">No - Neither AI nor technical background</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <br />
            <FormField
              control={form.control}
              name="aiKnowledge"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>
                    8. What is your current level of AI knowledge? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                      <FormItem className="flex items-center space-x-3 space-y-2">
                        <FormControl>
                          <RadioGroupItem value="I've only used tools like ChatGPT" />
                        </FormControl>
                        <FormLabel className="font-normal">I've only used tools like ChatGPT</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-2">
                        <FormControl>
                          <RadioGroupItem value="I'm currently building or experimenting with AI" />
                        </FormControl>
                        <FormLabel className="font-normal">I'm currently building or experimenting with AI</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-2">
                        <FormControl>
                          <RadioGroupItem value="None or very little experience" />
                        </FormControl>
                        <FormLabel className="font-normal">None or very little experience</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <br />

            <FormField
              control={form.control}
              name="priorTraining"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    9. Have you enrolled in prior AI training or coaching programs? If so, please briefly describe your experience (positive or
                    negative): <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" className="min-h-[100px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Goals & Challenges Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-500">Goals & Challenges</h2>
            <hr />
            <FormField
              control={form.control}
              name="biggestChallenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    10. What's your biggest challenge right now with Learning AI? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" className="min-h-[100px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="holdingBack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    11. What's holding you back from using AI in your work or business? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" className="min-h-[100px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desiredOutcome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    12. Desired Outcome: What would success look like for you after completing this program? <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="" className="min-h-[100px]" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Commitment Assessment Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-500">Commitment Assessment</h2>
            <hr />
            <FormField
              control={form.control}
              name="financialSituation"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>
                    13. Our AI coaching program involves a time and financial commitment. Which of the following best describes your current financial
                    situation? <span className="text-red-500">*</span>
                  </FormLabel>
                  <p className="text-orange-500 italic text-md font-semibold">
                    Please answer truthfully so we can provide the most accurate decision for your application.
                  </p>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-4">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="I have less than $1,000 across all my accounts" />
                        </FormControl>
                        <FormLabel className="font-normal">I have less than $1,000 across all my accounts</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="I have access to financial resources for this AI coaching program (over $1000 across all my accounts)" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I have access to financial resources for this AI coaching program (over $1000 across all my accounts)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="I have access to financial resources and would like to learn more about payment plan options (over $1000 across all my accounts)" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I have access to financial resources and would like to learn more about payment plan options (over $1000 across all my
                          accounts)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Professional Etiquette Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-500">Professional Etiquette</h2>
            <hr />
            <FormField
              control={form.control}
              name="agreeToBeFocused"
              render={({ field }) => (
                <FormItem className="space-y-5">
                  <FormLabel>
                    14. Do you agree to be fully present, focused, and in a quiet, distraction-free environment during your scheduled call?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Yes, I agree and will be present, prepared, and in a quiet space at the scheduled time" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Yes, I agree and will be present, prepared, and in a quiet space at the scheduled time
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="No" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="bg-gray-100 p-4 rounded-md">
              <i className="text-orange-500 font-[700]">
                <span className="font-bold">ℹ️</span> Out of respect for everyone's time, please ensure you are not driving or in a noisy or
                distracted environment. Calls will be disconnected if these conditions aren't met. We are building professionals who value excellence,
                and this standard allows us to best support you and ensure a productive, high-impact experience for both sides.
              </i>
            </div>
          </div>

          {apiResponse && (
            <div className={`mt-6 p-6 rounded-lg border ${apiResponse.eligible ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <h3 className={`text-lg font-semibold mb-2 ${apiResponse.eligible ? "text-green-700" : "text-red-700"}`}>
                {apiResponse.eligible ? "Application Approved!" : "Application Status Update"}
              </h3>
              <p className="whitespace-pre-wrap text-gray-700">{apiResponse.message}</p>
              {apiResponse.applicationId && (
                <p className="mt-4 text-sm font-medium">
                  Application ID: <span className="font-bold">{apiResponse.applicationId}</span>
                </p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
