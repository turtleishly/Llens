import { useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const trackOptions = [
  "AI Engineering",
  "AI Generated Arts",
  "AI Innovation",
  "AI Technical",
  "AI Architecture",
] as const;

const categoryOptions = [
  "Category A (Year 10/Year 11/Form 4/Form 5 [SPM]/Senior Middle 1/Senior Middle 2)",
  "Category B (Form 6 [STPM]/Senior Middle 3 [UEC]/Pre University/ Diploma)",
] as const;

const heardAboutOptions = [
  "School Counsellor/Teacher",
  "Social Media (Instagram/Facebook/LinkedIn)",
  "Newspaper/E-Newspaper",
  "Friends/Family",
  "Other",
] as const;

const qualificationOptions = [
  "Year 11",
  "Year 10",
  "Form 5",
  "Form 4",
  "Senior Middle 2",
  "Senior Middle 1",
] as const;

const advisorRelationshipOptions = ["Teacher Advisor", "Parent Advisor", "Other"] as const;

const teamMembers = [
  { key: "member1", label: "Team Member 1", startNumber: 5 },
  { key: "member2", label: "Team Member 2", startNumber: 12 },
  { key: "member3", label: "Team Member 3", startNumber: 19 },
  { key: "member4", label: "Team Member 4", startNumber: 26 },
] as const;

const registrationSchema = z.object({
  heardAbout: z.enum(heardAboutOptions, { required_error: "Select one option." }),
  teamName: z.string().min(1, "Team name is required."),
  track: z.enum(trackOptions, { required_error: "Select a track." }),
  category: z.enum(categoryOptions, { required_error: "Select a category." }),
  member1FullName: z.string().min(1, "Full name is required."),
  member1ContactNumber: z
    .string()
    .min(1, "Contact number is required.")
    .regex(/^[0-9]+$/, "Use digits only."),
  member1IcNumber: z
    .string()
    .min(1, "IC/Passport number is required.")
    .max(13, "Enter at most 13 characters."),
  member1Email: z.string().email("Enter a valid email."),
  member1School: z.string().min(1, "School or institution is required."),
  member1Qualification: z.enum(qualificationOptions, { required_error: "Select a qualification." }),
  member1GraduationDate: z.string().min(1, "Graduation date is required."),
  member2FullName: z.string().min(1, "Full name is required."),
  member2ContactNumber: z
    .string()
    .min(1, "Contact number is required.")
    .regex(/^[0-9]+$/, "Use digits only."),
  member2IcNumber: z
    .string()
    .min(1, "IC/Passport number is required.")
    .max(13, "Enter at most 13 characters."),
  member2Email: z.string().email("Enter a valid email."),
  member2School: z.string().min(1, "School or institution is required."),
  member2Qualification: z.enum(qualificationOptions, { required_error: "Select a qualification." }),
  member2GraduationDate: z.string().min(1, "Graduation date is required."),
  member3FullName: z.string().min(1, "Full name is required."),
  member3ContactNumber: z
    .string()
    .min(1, "Contact number is required.")
    .regex(/^[0-9]+$/, "Use digits only."),
  member3IcNumber: z
    .string()
    .min(1, "IC/Passport number is required.")
    .max(13, "Enter at most 13 characters."),
  member3Email: z.string().email("Enter a valid email."),
  member3School: z.string().min(1, "School or institution is required."),
  member3Qualification: z.enum(qualificationOptions, { required_error: "Select a qualification." }),
  member3GraduationDate: z.string().min(1, "Graduation date is required."),
  member4FullName: z.string().min(1, "Full name is required."),
  member4ContactNumber: z
    .string()
    .min(1, "Contact number is required.")
    .regex(/^[0-9]+$/, "Use digits only."),
  member4IcNumber: z
    .string()
    .min(1, "IC/Passport number is required.")
    .max(13, "Enter at most 13 characters."),
  member4Email: z.string().email("Enter a valid email."),
  member4School: z.string().min(1, "School or institution is required."),
  member4Qualification: z.enum(qualificationOptions, { required_error: "Select a qualification." }),
  member4GraduationDate: z.string().min(1, "Graduation date is required."),
  advisorFullName: z.string().min(1, "Advisor name is required."),
  advisorRelationship: z.enum(advisorRelationshipOptions, { required_error: "Select a relationship." }),
  advisorContactNumber: z
    .string()
    .min(1, "Advisor contact number is required.")
    .regex(/^[0-9]+$/, "Use digits only."),
  advisorEmail: z.string().email("Enter a valid advisor email."),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms and Conditions." }),
  }),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const toSafeId = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const defaultValues = useMemo<RegistrationValues>(
    () => ({
      heardAbout: "School Counsellor/Teacher",
      teamName: "",
      track: "AI Engineering",
      category:
        "Category A (Year 10/Year 11/Form 4/Form 5 [SPM]/Senior Middle 1/Senior Middle 2)",
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
      advisorContactNumber: "",
      advisorEmail: "",
      termsAccepted: false,
    }),
    [],
  );

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const onSubmit = (values: RegistrationValues) => {
    toast("Registration captured", {
      description: "Thanks! We received your team details.",
    });
    form.reset({
      ...defaultValues,
      track: values.track,
      category: values.category,
      heardAbout: values.heardAbout,
    });
  };

  return (
    <section id="registration" className="bg-secondary/40 py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-[0.35em]">
            The National AI Competition 2026 Registration
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Register Your Team
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            When you submit this form, it will not automatically collect your details like name and email address
            unless you provide it yourself.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
            Required
          </div>
        </div>

        <Card className="max-w-4xl mx-auto border-border/60 bg-background/90 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Competition Track & Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <div className="grid gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="heardAbout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>1. How did you hear about our event?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid gap-3"
                          >
                            {heardAboutOptions.map((option) => (
                              <div
                                key={option}
                                className="flex items-center gap-3 rounded-lg border border-border/60 bg-background px-4 py-3"
                              >
                                <RadioGroupItem value={option} id={`heard-${toSafeId(option)}`} />
                                <Label
                                  htmlFor={`heard-${toSafeId(option)}`}
                                  className="text-sm font-medium text-foreground"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>2. What is your Team Name?</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your team name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="track"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>3. Choose your Track</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid gap-3"
                          >
                            {trackOptions.map((option) => (
                              <div
                                key={option}
                                className="flex items-center gap-3 rounded-lg border border-border/60 bg-background px-4 py-3"
                              >
                                <RadioGroupItem value={option} id={`track-${toSafeId(option)}`} />
                                <Label
                                  htmlFor={`track-${toSafeId(option)}`}
                                  className="text-sm font-medium text-foreground"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>4. Choose your Category</FormLabel>
                        <FormDescription className="text-xs md:text-sm">
                          If any ONE of the members falls under (Form 6 [STPM]/Senior Middle 3 [UEC]/Pre University/
                          Diploma), the team will be required to join Category B.
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid gap-3 pt-3"
                          >
                            {categoryOptions.map((option) => (
                              <div
                                key={option}
                                className="flex items-start gap-3 rounded-lg border border-border/60 bg-background px-4 py-3"
                              >
                                <RadioGroupItem value={option} id={`category-${toSafeId(option)}`} className="mt-1" />
                                <Label
                                  htmlFor={`category-${toSafeId(option)}`}
                                  className="text-sm font-medium text-foreground"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-10">
                  {teamMembers.map((member) => (
                    <div
                      key={member.key}
                      className="rounded-2xl border border-border/60 bg-secondary/40 p-6 md:p-8 space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                          Category A {member.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Please ensure that all team members’ details are filled in accurately. Incomplete or incorrect
                          information may result in disqualification from the competition.
                        </p>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`${member.key}FullName` as keyof RegistrationValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {member.startNumber}. Full Name as per IC (Category A; {member.label})
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Enter full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`${member.key}ContactNumber` as keyof RegistrationValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{member.startNumber + 1}. Contact Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter contact number" inputMode="numeric" {...field} />
                              </FormControl>
                              <FormDescription>The value must be a number.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`${member.key}IcNumber` as keyof RegistrationValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{member.startNumber + 2}. IC Number / Passport Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter IC or passport number" {...field} />
                              </FormControl>
                              <FormDescription>Please enter at most 13 characters.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`${member.key}Email` as keyof RegistrationValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{member.startNumber + 3}. Email [Category A, {member.label}]</FormLabel>
                              <FormControl>
                                <Input placeholder="name@email.com" type="email" {...field} />
                              </FormControl>
                              <FormDescription>Please enter an email.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name={`${member.key}School` as keyof RegistrationValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{member.startNumber + 4}. Name of School / Institution</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter school or institution" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`${member.key}Qualification` as keyof RegistrationValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{member.startNumber + 5}. Highest Qualifications</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="grid gap-3"
                                >
                                  {qualificationOptions.map((option) => (
                                    <div
                                      key={option}
                                      className="flex items-center gap-3 rounded-lg border border-border/60 bg-background px-4 py-3"
                                    >
                                      <RadioGroupItem value={option} id={`${member.key}-qual-${toSafeId(option)}`} />
                                      <Label
                                        htmlFor={`${member.key}-qual-${toSafeId(option)}`}
                                        className="text-sm font-medium text-foreground"
                                      >
                                        {option}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`${member.key}GraduationDate` as keyof RegistrationValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{member.startNumber + 6}. Graduation Date (when are you graduating)</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
                        Required
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">Advisor Details</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You are required to have an advisor during this competition. The advisor&apos;s role is to be the
                      guardian/supervisor of the participants during the period of the competition.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="advisorFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>33. Advisor&apos;s Full Name as per IC</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter advisor full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advisorRelationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>34. Advisor&apos;s relationship with participants</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="grid gap-3"
                            >
                              {advisorRelationshipOptions.map((option) => (
                                <div
                                  key={option}
                                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-background px-4 py-3"
                                >
                                  <RadioGroupItem value={option} id={`advisor-${toSafeId(option)}`} />
                                  <Label
                                    htmlFor={`advisor-${toSafeId(option)}`}
                                    className="text-sm font-medium text-foreground"
                                  >
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="advisorContactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>35. Advisor&apos;s Contact Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter contact number" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormDescription>The value must be a number.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advisorEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>36. Advisor&apos;s Email</FormLabel>
                          <FormControl>
                            <Input placeholder="advisor@email.com" type="email" {...field} />
                          </FormControl>
                          <FormDescription>Please enter an email.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-secondary/30 p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
                      Required
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Terms and Conditions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please read and agree on the terms and conditions for the competitions.{" "}
                    <a
                      href="https://bit.ly/NAICTnC"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline underline-offset-4"
                    >
                      https://bit.ly/NAICTnC
                    </a>
                  </p>
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex items-start gap-3 rounded-lg border border-border/60 bg-background px-4 py-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-medium text-foreground">
                            37. Terms and Conditions
                          </FormLabel>
                          <FormDescription>I agree on the Terms and Conditions.</FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    We will contact the team lead using the email provided above.
                  </p>
                  <Button
                    type="submit"
                    className="h-12 rounded-full px-8 text-base font-semibold bg-cyan-500 text-white hover:bg-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                  >
                    Submit Registration
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;
