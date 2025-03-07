"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import axios from "axios";

export default function AssessmentForm() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGreen, setShowGreen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    currentOccupation: "",
    timeCommitment: "",
    importance: "",
    reasons: [] as string[],
    investmentRange: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.currentOccupation) newErrors.currentOccupation = "Current occupation is required";
    if (!formData.timeCommitment) newErrors.timeCommitment = "Time commitment selection is required";
    if (!formData.importance) newErrors.importance = "Importance rating is required";
    if (formData.reasons.length === 0) newErrors.reasons = "Please select at least one reason";
    if (!formData.investmentRange) newErrors.investmentRange = "Investment range selection is required";

    // Check if "None" is selected along with other reasons
    if (formData.reasons.includes("none") && formData.reasons.length > 1) {
      newErrors.reasons = 'Cannot select "None" with other options';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prevData) => {
      const newReasons = checked ? [...prevData.reasons, value] : prevData.reasons.filter((reason) => reason !== value);

      // If selecting "none", clear other selections
      if (value === "none" && checked) {
        return { ...prevData, reasons: ["none"] };
      }

      // If selecting another option while "none" is selected, remove "none"
      if (value !== "none" && checked && prevData.reasons.includes("none")) {
        return { ...prevData, reasons: [value] };
      }

      return { ...prevData, reasons: newReasons };
    });
    if (errors.reasons) {
      setErrors((prev) => ({ ...prev, reasons: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post("/api/eligibility", formData);

      if (response.status === 200) {
        setApiResponse(response.data.message);
        setShowGreen(response.data.eligible);
        toast({
          title: "Success!",
          description: response.data.message || "Your assessment has been submitted successfully.",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          currentOccupation: "",
          timeCommitment: "",
          importance: "",
          reasons: [],
          investmentRange: "",
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your assessment. Please try again.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 p-3 shadow-lg ">
      {/* Personal Information */}
      <div style={{ height: 10 }} />
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">AI Readiness Assessment</h2>
        <p className="max-w-[700px] text-gray-500 md:text-xl">Take our assessment to determine your eligibility for the program</p>
      </div>{" "}
      <div style={{ height: 10 }} />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentOccupation">Current Occupation</Label>
        <Input id="currentOccupation" name="currentOccupation" value={formData.currentOccupation} onChange={handleChange} required />
        {errors.currentOccupation && <p className="text-sm text-red-500">{errors.currentOccupation}</p>}
      </div>
      {/* Weekly Time Commitment */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Weekly Time Commitment (Select One)</Label>
          <p className="text-sm text-muted-foreground">
            How many hours per week can you devote to AI learning? We recommend at least five for meaningful progress.
          </p>
        </div>
        <RadioGroup value={formData.timeCommitment} onValueChange={(value) => handleRadioChange("timeCommitment", value)} className="space-y-2">
          <div className="flex items-center space-x-2 shadow-sm p-4  border-red-500 border-[1px] rounded-lg">
            <RadioGroupItem value="0" id="hours-0" />
            <Label htmlFor="hours-0" className="font-normal">
              <span className="block">0 hours</span>
              <span className="block text-sm text-red-500">I do not have time</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 shadow-sm p-4  border-yellow-500 border-[1px] rounded-lg">
            <RadioGroupItem value="1" id="hours-1" />
            <Label htmlFor="hours-1" className="font-normal">
              <span className="block">1 hour</span>
              <span className="block text-sm text-yellow-500">Time investment insufficient</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 shadow-sm p-4  border-green-500 border-[1px] rounded-lg">
            <RadioGroupItem value="5" id="hours-5" />
            <Label htmlFor="hours-5" className="font-normal">
              <span className="block">5 hours</span>
              <span className="block text-sm text-green-500">I am ready to invest this time weekly</span>
            </Label>
            <span className="ml-2 text-sm text-muted-foreground">(Recommended)</span>
          </div>
        </RadioGroup>
        {errors.timeCommitment && <p className="text-sm text-red-500">{errors.timeCommitment}</p>}
      </div>
      {/* Importance Rating */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Importance of Enrolling in the LEARN AI Coaching Program</Label>
          <p className="text-sm text-muted-foreground">Rate from 1 to 5 (Highest)</p>
        </div>
        <RadioGroup value={formData.importance} onValueChange={(value) => handleRadioChange("importance", value)} className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value} className="flex items-center">
              <RadioGroupItem value={value.toString()} id={`importance-${value}`} />
              <Label htmlFor={`importance-${value}`} className="ml-2 font-normal">
                {value} {value === 5 && "(Highest)"}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.importance && <p className="text-sm text-red-500">{errors.importance}</p>}
      </div>
      {/* Reasons for Enrolling */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Reason for Enrolling in Our LEARN AI Coaching Program</Label>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reason-none"
              onCheckedChange={(checked) => handleCheckboxChange("none", checked as boolean)}
              checked={formData.reasons.includes("none")}
            />
            <Label htmlFor="reason-none" className="font-normal">
              <span>None</span>
              <span className="ml-1 text-red-500">(Will not be accepted)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reason-career-change"
              onCheckedChange={(checked) => handleCheckboxChange("career-change", checked as boolean)}
              checked={formData.reasons.includes("career-change")}
            />
            <Label htmlFor="reason-career-change" className="font-normal">
              Change Career
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reason-career-advancement"
              onCheckedChange={(checked) => handleCheckboxChange("career-advancement", checked as boolean)}
              checked={formData.reasons.includes("career-advancement")}
            />
            <Label htmlFor="reason-career-advancement" className="font-normal">
              Career Advancement
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reason-entrepreneurship"
              onCheckedChange={(checked) => handleCheckboxChange("entrepreneurship", checked as boolean)}
              checked={formData.reasons.includes("entrepreneurship")}
            />
            <Label htmlFor="reason-entrepreneurship" className="font-normal">
              Explore AI Entrepreneurship (e.g., learn how to grow/build an AI business)
            </Label>
          </div>
        </div>
        {errors.reasons && <p className="text-sm text-red-500">{errors.reasons}</p>}
      </div>
      {/* Investment Range */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Investment Range</Label>
          <p className="text-sm text-muted-foreground">
            Please select your financial commitment level so we can tailor your enrollment for maximum impact.
          </p>
        </div>
        <RadioGroup value={formData.investmentRange} onValueChange={(value) => handleRadioChange("investmentRange", value)} className="space-y-4">
          <div className="flex items-center space-x-2 border-red-500 border-[1px] p-3 rounded-lg">
            <RadioGroupItem value="0-3000" id="range-1" className="mt-1" />
            <Label htmlFor="range-1" className="font-normal">
              <span className="block font-medium">$0 - $3,000</span>
              <span className="block mt-2 text-sm text-red-500">I do not value investing in myself to LEARN AI</span>
            </Label>
            <span className="ml-2 text-sm text-muted-foreground text-right">(Below Investment Threshold)</span>
          </div>
          <div className="flex items-center space-x-2 border-blue-500 border-[1px] p-3 rounded-lg">
            <RadioGroupItem value="3500-4500" id="range-2" className="mt-1" />
            <Label htmlFor="range-2" className="font-normal">
              <span className="block font-medium">$3,500 - $4,500</span>
              <span className="block mt-2 text-sm text-blue-500">
                I am ready to invest in myself to LEARN AI from a Valued AI Coach with real life experiences and over 10+ years of Experience
              </span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 shadow-sm p-4  border-green-500 border-[1px] rounded-lg">
            <RadioGroupItem value="5000+" id="range-3" className="mt-1" />
            <Label htmlFor="range-3" className="font-normal">
              <span className="block font-medium">$5,000+</span>
              <span className="block text-sm mt-2 text-green-500">
                I am open to invest now and in future AI Coaching, mentorship, community, how to apply AI in my career, future career & use AI to
                generate passive income
              </span>
            </Label>
            <span className="ml-2 text-sm text-muted-foreground">(Most Recommended)</span>
          </div>
        </RadioGroup>
        {errors.investmentRange && <p className="text-sm text-red-500">{errors.investmentRange}</p>}
      </div>
      {/* Warning Note */}
      <Alert className="bg-muted">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Note: We value serious learners who are genuinely committed. Spammers or dishonest submissions will be blocked from our LEARN AI coaching
          program. We respect the time and dedication of those ready to transform their careers.
        </AlertDescription>
      </Alert>
      {apiResponse && (
        <div
          className={`mt-4 p-4 ${
            showGreen ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"
          }  rounded-lg border shadow-md`}
        >
          {apiResponse
            .split(/(?<=[.!:?])\s+/) // Split sentences properly
            .map((sentence, index) => (
              <p key={index} className="mb-2 leading-relaxed">
                {sentence.trim()}
              </p>
            ))}
        </div>
      )}
      {apiResponse && (
        <Alert
          className={`mt-4 p-4 ${
            showGreen ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"
          }  rounded-lg border shadow-md`}
        >
          <AlertDescription>
            {showGreen
              ? "Congratulations! You are eligible for the program. Please check your email for the next steps."
              : "Sorry, you are not eligible for the program. Please check your email for further details."}
          </AlertDescription>
        </Alert>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <div className="flex items-center space-x-2">
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            <span>Submitting...</span>
          </div>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
