import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormProgress } from "@/components/FormProgress";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useFormAutoSave } from "@/hooks/useFormAutoSave";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Confetti from "react-confetti";
const trackOptions = ["Innovation", "Generated Art", "Computing", "Engineering", "Architecture"] as const;
const categoryOptions = ["Category A (Year 10/Year 11/Form 4/Form 5 [SPM]/Senior Middle 1/Senior Middle 2)", "Category B (Form 6 [STPM]/Senior Middle 3 [UEC]/Pre University/ Diploma)"] as const;
const heardAboutOptions = ["School Counsellor/Teacher", "Social Media (Instagram/Facebook/LinkedIn)", "Newspaper/E-Newspaper", "Friends/Family", "Other"] as const;
const qualificationOptions = ["Year 11", "Year 10", "Form 5", "Form 4", "Senior Middle 2", "Senior Middle 1"] as const;
const advisorRelationshipOptions = ["Teacher Advisor", "Parent Advisor", "Other"] as const;
const teamMembers = [{
  key: "member1",
  label: "Team Member 1",
  startNumber: 5
}, {
  key: "member2",
  label: "Team Member 2",
  startNumber: 12
}, {
  key: "member3",
  label: "Team Member 3",
  startNumber: 19
}, {
  key: "member4",
  label: "Team Member 4",
  startNumber: 26
}] as const;
const registrationSchema = z.object({
  heardAbout: z.enum(heardAboutOptions, {
    required_error: "Select one option."
  }),
  teamName: z.string().min(1, "Team name is required."),
  track: z.enum(trackOptions, {
    required_error: "Select a track."
  }),
  category: z.enum(categoryOptions, {
    required_error: "Select a category."
  }),
  member1FullName: z.string().min(1, "Full name is required."),
  member1ContactNumber: z.string().min(1, "Contact number is required.").regex(/^[0-9]+$/, "Use digits only."),
  member1IcNumber: z.string().min(1, "IC/Passport number is required.").max(13, "Enter at most 13 characters."),
  member1Email: z.string().email("Enter a valid email."),
  member1School: z.string().min(1, "School or institution is required."),
  member1Qualification: z.enum(qualificationOptions, {
    required_error: "Select a qualification."
  }),
  member1GraduationDate: z.string().min(1, "Graduation date is required."),
  member2FullName: z.string().min(1, "Full name is required."),
  member2ContactNumber: z.string().min(1, "Contact number is required.").regex(/^[0-9]+$/, "Use digits only."),
  member2IcNumber: z.string().min(1, "IC/Passport number is required.").max(13, "Enter at most 13 characters."),
  member2Email: z.string().email("Enter a valid email."),
  member2School: z.string().min(1, "School or institution is required."),
  member2Qualification: z.enum(qualificationOptions, {
    required_error: "Select a qualification."
  }),
  member2GraduationDate: z.string().min(1, "Graduation date is required."),
  member3FullName: z.string().min(1, "Full name is required."),
  member3ContactNumber: z.string().min(1, "Contact number is required.").regex(/^[0-9]+$/, "Use digits only."),
  member3IcNumber: z.string().min(1, "IC/Passport number is required.").max(13, "Enter at most 13 characters."),
  member3Email: z.string().email("Enter a valid email."),
  member3School: z.string().min(1, "School or institution is required."),
  member3Qualification: z.enum(qualificationOptions, {
    required_error: "Select a qualification."
  }),
  member3GraduationDate: z.string().min(1, "Graduation date is required."),
  member4FullName: z.string().min(1, "Full name is required."),
  member4ContactNumber: z.string().min(1, "Contact number is required.").regex(/^[0-9]+$/, "Use digits only."),
  member4IcNumber: z.string().min(1, "IC/Passport number is required.").max(13, "Enter at most 13 characters."),
  member4Email: z.string().email("Enter a valid email."),
  member4School: z.string().min(1, "School or institution is required."),
  member4Qualification: z.enum(qualificationOptions, {
    required_error: "Select a qualification."
  }),
  member4GraduationDate: z.string().min(1, "Graduation date is required."),
  advisorFullName: z.string().min(1, "Advisor name is required."),
  advisorRelationship: z.enum(advisorRelationshipOptions, {
    required_error: "Select a relationship."
  }),
  advisorRelationshipOther: z.string().optional(),
  advisorRelationshipDetails: z.string().min(1, "Please provide additional details about your relationship."),
  advisorContactNumber: z.string().min(1, "Advisor contact number is required.").regex(/^[0-9]+$/, "Use digits only."),
  advisorEmail: z.string().email("Enter a valid advisor email."),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the Terms and Conditions."
    })
  }),
  parentalConsentConfirmed: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm parental/guardian consent."
    })
  })
}).refine((data) => {
  if (data.advisorRelationship === "Other" && !data.advisorRelationshipOther?.trim()) {
    return false;
  }
  return true;
}, {
  message: "Please specify the relationship.",
  path: ["advisorRelationshipOther"]
});
type RegistrationValues = z.infer<typeof registrationSchema>;
const STEPS = ["Start", "Team Info", "Team Members", "Advisor", "Review"];
const RegistrationForm = () => {
  const navigate = useNavigate();
  const toSafeId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([0])); // Track completed steps, welcome is always complete
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const defaultValues = useMemo<RegistrationValues>(() => ({
    heardAbout: "School Counsellor/Teacher",
    teamName: "",
    track: "Innovation",
    category: "Category A (Year 10/Year 11/Form 4/Form 5 [SPM]/Senior Middle 1/Senior Middle 2)",
    member1FullName: "",
    member1ContactNumber: "",
    member1IcNumber: "",
    member1Email: "",
    member1School: "",
    member1Qualification: "Year 11",
    member1GraduationDate: "",
    member2FullName: "",
    member2ContactNumber: "",
    member2IcNumber: "",
    member2Email: "",
    member2School: "",
    member2Qualification: "Year 11",
    member2GraduationDate: "",
    member3FullName: "",
    member3ContactNumber: "",
    member3IcNumber: "",
    member3Email: "",
    member3School: "",
    member3Qualification: "Year 11",
    member3GraduationDate: "",
    member4FullName: "",
    member4ContactNumber: "",
    member4IcNumber: "",
    member4Email: "",
    member4School: "",
    member4Qualification: "Year 11",
    member4GraduationDate: "",
    advisorFullName: "",
    advisorRelationship: "Teacher Advisor",
    advisorRelationshipOther: "",
    advisorRelationshipDetails: "",
    advisorContactNumber: "",
    advisorEmail: "",
    termsAccepted: false,
    parentalConsentConfirmed: false
  }), []);
  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onChange"
  });
  const {
    currentStep,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep
  } = useMultiStepForm(STEPS.length);
  const {
    loadSavedData,
    clearSavedData
  } = useFormAutoSave(form.watch);

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadSavedData();
    if (savedData && Object.keys(savedData).length > 0) {
      Object.keys(savedData).forEach(key => {
        const value = savedData[key as keyof RegistrationValues];
        if (value !== undefined && value !== null && value !== "") {
          form.setValue(key as keyof RegistrationValues, value, {
            shouldValidate: false
          });
        }
      });
    }
  }, [loadSavedData]);
  const validateStep = async () => {
    let fieldsToValidate: (keyof RegistrationValues)[] = [];
    switch (currentStep) {
      case 0:
        fieldsToValidate = []; // Welcome step
        break;
      case 1:
        fieldsToValidate = ["heardAbout", "teamName", "track", "category"];
        break;
      case 2:
        fieldsToValidate = [
          "member1FullName", "member1ContactNumber", "member1IcNumber", "member1Email", "member1School", "member1Qualification", "member1GraduationDate",
          "member2FullName", "member2ContactNumber", "member2IcNumber", "member2Email", "member2School", "member2Qualification", "member2GraduationDate",
          "member3FullName", "member3ContactNumber", "member3IcNumber", "member3Email", "member3School", "member3Qualification", "member3GraduationDate",
          "member4FullName", "member4ContactNumber", "member4IcNumber", "member4Email", "member4School", "member4Qualification", "member4GraduationDate"
        ];
        break;
      case 3:
        fieldsToValidate = ["advisorFullName", "advisorRelationship", "advisorRelationshipOther", "advisorRelationshipDetails", "advisorContactNumber", "advisorEmail", "parentalConsentConfirmed"];
        break;
      case 4:
        fieldsToValidate = ["termsAccepted"];
        break;
    }

    if (fieldsToValidate.length === 0) return true;
    const result = await form.trigger(fieldsToValidate);
    return result;
  };
  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      // Mark current step as completed
      setCompletedSteps(prev => new Set(prev).add(currentStep));
      next();
    } else {
      // Allow skipping but show warning
      toast("Step incomplete", {
        description: "You can continue but please complete this section before submitting.",
        action: {
          label: "Continue Anyway",
          onClick: () => {
            next();
          }
        }
      });
    }
  };
  const onSubmit = async (values: RegistrationValues) => {
    try {
      setIsSubmitting(true);

      // Map form values to database schema (camelCase to snake_case)
      const submissionData = {
        heard_about: values.heardAbout,
        team_name: values.teamName,
        track: values.track,
        category: values.category,
        member1_full_name: values.member1FullName,
        member1_contact_number: values.member1ContactNumber,
        member1_ic_number: values.member1IcNumber,
        member1_email: values.member1Email,
        member1_school: values.member1School,
        member1_qualification: values.member1Qualification,
        member1_graduation_date: values.member1GraduationDate,
        member2_full_name: values.member2FullName,
        member2_contact_number: values.member2ContactNumber,
        member2_ic_number: values.member2IcNumber,
        member2_email: values.member2Email,
        member2_school: values.member2School,
        member2_qualification: values.member2Qualification,
        member2_graduation_date: values.member2GraduationDate,
        member3_full_name: values.member3FullName,
        member3_contact_number: values.member3ContactNumber,
        member3_ic_number: values.member3IcNumber,
        member3_email: values.member3Email,
        member3_school: values.member3School,
        member3_qualification: values.member3Qualification,
        member3_graduation_date: values.member3GraduationDate,
        member4_full_name: values.member4FullName,
        member4_contact_number: values.member4ContactNumber,
        member4_ic_number: values.member4IcNumber,
        member4_email: values.member4Email,
        member4_school: values.member4School,
        member4_qualification: values.member4Qualification,
        member4_graduation_date: values.member4GraduationDate,
        advisor_full_name: values.advisorFullName,
        advisor_relationship: values.advisorRelationship,
        advisor_relationship_other: values.advisorRelationshipOther || null,
        advisor_relationship_details: values.advisorRelationshipDetails,
        advisor_contact_number: values.advisorContactNumber,
        advisor_email: values.advisorEmail,
      };

      const { error: supabaseError } = await supabase
        .from('registrations')
        .insert([submissionData]);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setShowSuccessAnimation(true);
      clearSavedData();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      toast("Unable to submit registration", {
        description: error instanceof Error ? error.message : "Please try again or contact the organizers."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation - Enter or Ctrl+Enter to continue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter on input fields or Ctrl+Enter anywhere to continue
      if (e.key === "Enter") {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          if (!isLastStep) {
            handleNext();
          } else {
            form.handleSubmit(onSubmit)();
          }
        } else if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          e.preventDefault();
          if (!isLastStep) {
            handleNext();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, isLastStep, handleNext]);
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <TeamInfoStep form={form} trackOptions={trackOptions} categoryOptions={categoryOptions} heardAboutOptions={heardAboutOptions} toSafeId={toSafeId} />;
      case 2:
        return <TeamMembersStep form={form} members={teamMembers} qualificationOptions={qualificationOptions} toSafeId={toSafeId} />;
      case 3:
        return <AdvisorStep form={form} advisorRelationshipOptions={advisorRelationshipOptions} toSafeId={toSafeId} />;
      case 4:
        return <ReviewStep form={form} />;
      default:
        return null;
    }
  };
  return <section id="registration" className="fixed inset-0 bg-background overflow-hidden">
    {/* Exit Button */}
    <button onClick={() => navigate("/")} className="fixed top-4 right-4 z-50 p-2 rounded-full hover:bg-secondary/80 transition-colors" aria-label="Exit registration">
      <X className="w-5 h-5" />
    </button>

    {/* Scrollable Content Area - with padding for fixed nav */}
    <div className="h-full overflow-y-auto pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
        {currentStep > 0 && <div className="mb-8">
          <FormProgress currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} onStepClick={goTo} completedSteps={completedSteps} />
        </div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} transition={{
                duration: 0.2
              }}>
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </div>
    </div>

    {/* Fixed Navigation Bar at Bottom */}
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-40">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-4">
        <div className="flex items-center justify-between">
          {currentStep > 0 ? <Button type="button" variant="ghost" onClick={back} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button> : <div />}

          <div className="flex items-center gap-3">
            {/* Keyboard shortcut hint */}
            {currentStep > 0 && <span className="text-xs text-muted-foreground hidden sm:block">
              Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">{isMac ? '⌘' : 'Ctrl'}</kbd> + <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Enter</kbd> to continue
            </span>}

            {currentStep === 0 ? <Button type="button" onClick={next} size="lg" className="gap-2">
              Start
              <ArrowRight className="w-4 h-4" />
            </Button> : !isLastStep ? <Button type="button" onClick={handleNext} className="gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button> : <Button type="submit" disabled={isSubmitting} onClick={async (e) => {
              e.preventDefault();
              const isValid = await form.trigger();
              if (isValid) {
                form.handleSubmit(onSubmit)();
              } else {
                const errors = form.formState.errors;
                // Go to first step with errors
                if (errors.heardAbout || errors.teamName || errors.track || errors.category) {
                  goTo(1);
                } else if (Object.keys(errors).some(key => key.startsWith('member'))) {
                  goTo(2);
                } else if (Object.keys(errors).some(key => key.startsWith('advisor'))) {
                  goTo(3);
                } else {
                  goTo(4);
                }
                toast("Form has errors", {
                  description: "Please check the highlighted fields."
                });
              }
            }} className="gap-2">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>}
          </div>
        </div>
      </div>
    </div>

    {showSuccessAnimation && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 flex items-center justify-center z-50 bg-background/95">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.3}
      />
      <motion.div initial={{
        scale: 0.8,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        duration: 0.3
      }} className="text-center space-y-4">
        <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.2,
          type: "spring"
        }} className="w-16 h-16 mx-auto bg-foreground text-background rounded-full flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-semibold">Registration Complete!</h3>
        <p className="text-muted-foreground">We'll be in touch soon.</p>
      </motion.div>
    </motion.div>}
  </section>;
};

// Step Components
function WelcomeStep({
  form,
  heardAboutOptions,
  toSafeId
}: any) {
  return <div className="min-h-[500px] flex flex-col items-center justify-center text-center space-y-8 py-12">
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="space-y-6 max-w-2xl">
      <div className="relative max-w-sm mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl mb-8">
        <img src="/naic2025photo.jpg" alt="NAIC 2025" className="object-cover w-full h-full" />
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Register for NAIC 2026
        </h1>
        <p className="text-xl text-muted-foreground">Join the National AI Competition.</p>
      </div>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Takes about 5 minutes</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Auto-saved as you go</span>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
        <p className="text-sm text-foreground">
          For competition details, visit our{" "}
          <Link to="/" target="_blank" className="text-primary hover:underline font-medium">
            homepage
          </Link>
          {" "}and{" "}
          <Link to="/tracks" target="_blank" className="text-primary hover:underline font-medium">
            tracks page
          </Link>
          .
        </p>
        <p className="text-sm text-foreground">
          By proceeding, you agree to our{" "}
          <Link to="/terms" target="_blank" className="text-primary hover:underline font-medium">
            Terms and Conditions
          </Link>
          {" "}and{" "}
          <Link to="/privacy" target="_blank" className="text-primary hover:underline font-medium">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-sm text-muted-foreground">
          For enquiries, contact{" "}
          <a href="mailto:naic@rakantutor.org" className="text-primary hover:underline font-medium">
            naic@rakantutor.org
          </a>
        </p>
      </div>
    </motion.div>
  </div>;
}
function TeamInfoStep({
  form,
  trackOptions,
  categoryOptions,
  heardAboutOptions,
  toSafeId
}: any) {
  return <div className="space-y-12 py-8">
    <FormField control={form.control} name="heardAbout" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-2xl font-semibold">How did you hear about our event?</FormLabel>
        <FormControl>
          <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
            {heardAboutOptions.map((option: string) => <div key={option} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`heard-${toSafeId(option)}`} />
              <Label htmlFor={`heard-${toSafeId(option)}`} className="text-base font-normal cursor-pointer">
                {option}
              </Label>
            </div>)}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <FormField control={form.control} name="teamName" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-2xl font-semibold">What is your Team Name?</FormLabel>
        <FormControl>
          <Input placeholder="Type your answer here..." {...field} className="text-lg border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-cyan-500 px-0" />
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <FormField control={form.control} name="track" render={({
      field
    }) => <FormItem className="space-y-4">
        <div className="flex flex-col gap-1">
          <FormLabel className="text-2xl font-semibold">Choose your Track</FormLabel>
          <FormDescription>
            <Link to="/tracks" target="_blank" className="text-cyan-500 hover:underline inline-flex items-center gap-1">
              Learn more about the tracks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FormDescription>
        </div>
        <FormControl>
          <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
            {trackOptions.map((option: string) => <div key={option} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`track-${toSafeId(option)}`} />
              <Label htmlFor={`track-${toSafeId(option)}`} className="text-base font-normal cursor-pointer">
                {option}
              </Label>
            </div>)}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <FormField control={form.control} name="category" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-2xl font-semibold">Choose your Category</FormLabel>
        <FormDescription className="text-sm text-muted-foreground">
          If any ONE of the members falls under (Form 6 [STPM]/Senior Middle 3 [UEC]/Pre University/
          Diploma), the team will be required to join Category B.
        </FormDescription>
        <FormControl>
          <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
            {categoryOptions.map((option: string) => <div key={option} className="flex items-start space-x-3">
              <RadioGroupItem value={option} id={`category-${toSafeId(option)}`} className="mt-1" />
              <Label htmlFor={`category-${toSafeId(option)}`} className="text-base font-normal cursor-pointer leading-relaxed">
                {option}
              </Label>
            </div>)}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>} />
  </div>;
}
function TeamMembersStep({
  form,
  members,
  qualificationOptions,
  toSafeId
}: any) {
  const isMemberComplete = (memberKey: string) => {
    const values = form.getValues();
    return values[`${memberKey}FullName`] && values[`${memberKey}ContactNumber`] && values[`${memberKey}IcNumber`] && values[`${memberKey}Email`] && values[`${memberKey}School`] && values[`${memberKey}Qualification`] && values[`${memberKey}GraduationDate`];
  };
  return <div className="space-y-8 py-8">
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold">Team Members</h3>
      <p className="text-muted-foreground">
        Please provide details for all 4 team members
      </p>
    </div>

    <Accordion type="single" collapsible defaultValue="member1" className="space-y-4">
      {members.map((member: any) => {
        const isComplete = isMemberComplete(member.key);
        return <AccordionItem key={member.key} value={member.key} className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              {isComplete ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <div className="w-5 h-5 rounded-full border-2 border-border" />}
              <span className="font-medium">{member.label}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-8 pt-6 pb-4">
            <FormField control={form.control} name={`${member.key}FullName`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">Full Name (as per IC)</FormLabel>
                <FormControl>
                  <Input placeholder="Type your answer here..." {...field} className="border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

            <FormField control={form.control} name={`${member.key}ContactNumber`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Type your answer here..." inputMode="numeric" {...field} className="border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

            <FormField control={form.control} name={`${member.key}IcNumber`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">IC Number / Passport Number</FormLabel>
                <FormControl>
                  <Input placeholder="Type your answer here..." {...field} className="border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

            <FormField control={form.control} name={`${member.key}Email`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" type="email" {...field} className="border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

            <FormField control={form.control} name={`${member.key}School`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">School / Institution</FormLabel>
                <FormControl>
                  <Input placeholder="Type your answer here..." {...field} className="border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

            <FormField control={form.control} name={`${member.key}Qualification`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">Highest Qualification</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                    {qualificationOptions.map((option: string) => <div key={option} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`${member.key}-qual-${toSafeId(option)}`} />
                      <Label htmlFor={`${member.key}-qual-${toSafeId(option)}`} className="text-sm font-normal cursor-pointer">
                        {option}
                      </Label>
                    </div>)}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>} />

            <FormField control={form.control} name={`${member.key}GraduationDate`} render={({
              field
            }) => <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium">Graduation Date</FormLabel>
                <FormControl>
                  <Input type="month" {...field} className="border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0 max-w-xs" />
                </FormControl>
                <FormMessage />
              </FormItem>} />
          </AccordionContent>
        </AccordionItem>;
      })}
    </Accordion>
  </div>;
}
function AdvisorStep({
  form,
  advisorRelationshipOptions,
  toSafeId
}: any) {
  return <div className="space-y-12 py-8">
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold">Advisor Details</h3>
      <p className="text-muted-foreground">
        You are required to have an advisor during this competition.
      </p>
    </div>

    <FormField control={form.control} name="advisorFullName" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-xl font-medium">Advisor's Full Name (as per IC)</FormLabel>
        <FormControl>
          <Input placeholder="Type your answer here..." {...field} className="text-lg border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <FormField control={form.control} name="advisorRelationship" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-xl font-medium">Relationship with Participants</FormLabel>
        <FormControl>
          <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
            {advisorRelationshipOptions.map((option: string) => <div key={option} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`advisor-${toSafeId(option)}`} />
              <Label htmlFor={`advisor-${toSafeId(option)}`} className="text-base font-normal cursor-pointer">
                {option}
              </Label>
            </div>)}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>} />

    {form.watch("advisorRelationship") === "Other" && (
      <FormField control={form.control} name="advisorRelationshipOther" render={({
        field
      }) => <FormItem className="space-y-4">
          <FormLabel className="text-xl font-medium">Please specify relationship</FormLabel>
          <FormControl>
            <Input placeholder="e.g., School Counselor, Mentor, Coach..." {...field} className="text-lg border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
          </FormControl>
          <FormMessage />
        </FormItem>} />
    )}

    <FormField control={form.control} name="advisorRelationshipDetails" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-xl font-medium">Additional Details About Your Relationship</FormLabel>
        <FormControl>
          <Input placeholder="e.g., I am the parent of [student], I am a teacher at [school]..." {...field} className="text-lg border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <FormField control={form.control} name="advisorContactNumber" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-xl font-medium">Contact Number</FormLabel>
        <FormControl>
          <Input placeholder="Type your answer here..." inputMode="numeric" {...field} className="text-lg border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <FormField control={form.control} name="advisorEmail" render={({
      field
    }) => <FormItem className="space-y-4">
        <FormLabel className="text-xl font-medium">Email</FormLabel>
        <FormControl>
          <Input placeholder="advisor@example.com" type="email" {...field} className="text-lg border-0 border-b-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0" />
        </FormControl>
        <FormMessage />
      </FormItem>} />

    <div className="space-y-6 pt-8 border-t">
      <div className="space-y-2">
        <h4 className="font-medium">Parental/Guardian Consent</h4>
        <p className="text-sm text-muted-foreground">
          All team members must have obtained consent from their parent/guardian to participate.
        </p>
      </div>
      <FormField control={form.control} name="parentalConsentConfirmed" render={({
        field
      }) => <FormItem className="flex items-start gap-3">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1 h-5 w-5" />
          </FormControl>
          <div className="space-y-1">
            <FormLabel className="text-base font-normal cursor-pointer">
              As {form.watch("teamName") || "the team leader"}, I confirm that each of our team members has obtained consent from their parent/guardian to participate in National AI Competition 2026.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>} />
    </div>
  </div>;
}
function ReviewStep({
  form
}: any) {
  const values = form.getValues();
  return <div className="space-y-12 py-8">
    <div className="space-y-2">
      <h3 className="text-2xl font-semibold">Review & Submit</h3>
      <p className="text-muted-foreground">Please review your information before submitting.</p>
    </div>

    <div className="space-y-8">
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Team Information</h4>
        <div className="space-y-2 text-base">
          <div><span className="font-medium">Team Name:</span> {values.teamName}</div>
          <div><span className="font-medium">Track:</span> {values.track}</div>
          <div><span className="font-medium">Category:</span> {values.category}</div>
        </div>
      </div>

      {[1, 2, 3, 4].map(num => {
        const key = `member${num}`;
        return <div key={key} className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Team Member {num}
          </h4>
          <div className="space-y-2 text-base">
            <div><span className="font-medium">Name:</span> {values[`${key}FullName`]}</div>
            <div><span className="font-medium">Email:</span> {values[`${key}Email`]}</div>
          </div>
        </div>;
      })}

      <div className="space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Advisor</h4>
        <div className="space-y-2 text-base">
          <div><span className="font-medium">Name:</span> {values.advisorFullName}</div>
          <div><span className="font-medium">Email:</span> {values.advisorEmail}</div>
        </div>
      </div>
    </div>

    <div className="space-y-6 pt-8 border-t">
      <div className="space-y-2">
        <h4 className="font-medium">Terms and Conditions</h4>
        <p className="text-sm text-muted-foreground">
          Please read and agree to the{" "}
          <Link to="/terms" target="_blank" className="underline hover:text-foreground">
            terms and conditions
          </Link>{" "}
          and{" "}
          <Link to="/privacy" target="_blank" className="underline hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </div>
      <FormField control={form.control} name="termsAccepted" render={({
        field
      }) => <FormItem className="flex items-start gap-3">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1 h-5 w-5" />
          </FormControl>
          <div className="space-y-1">
            <FormLabel className="text-base font-normal cursor-pointer">
              I acknowledge that I have read and agree to the Terms and Conditions, and understand that the competition organizers reserve the right to modify any terms and conditions as necessary.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>} />
    </div>
  </div>;
}
export default RegistrationForm;