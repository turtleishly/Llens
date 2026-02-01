import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { supabase } from "@/integrations/supabase/client";

export default function RakanTutorContact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        purposeOfContact: z.string().min(1, "Please select a purpose of contact"),
        mobileNumber: z.string().min(8, "Please enter a valid mobile number"),
        profession: z.string().min(1, "Please select your profession"),
        message: z.string().optional(),
    });

    type ContactValues = z.infer<typeof contactSchema>;

    const form = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            purposeOfContact: "",
            mobileNumber: "",
            profession: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactValues) => {
        try {
            setIsSubmitting(true);
            const { error } = await supabase.functions.invoke("handle-contact", {
                body: {
                    ...values,
                    source: "rakan-tutor", // Distinguish from NAIC contacts
                },
            });

            if (error) throw error;

            toast.success("Message sent successfully!", {
                description: "We'll get back to you as soon as possible.",
            });
            form.reset();
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message", {
                description: "Please try again or contact us directly via email.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Header />

            <main className="relative">
                {/* Hero / Header Section */}
                <section className="relative pt-32 pb-20 px-4 md:px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--hero-bg-from))_0%,hsl(var(--hero-bg-via))_45%,hsl(var(--hero-bg-to))_100%)]">
                        <DitheredBackground className="z-0" />
                    </div>

                    <div className="container relative z-10 max-w-4xl mx-auto text-center">
                        <BlurFade delay={0.1}>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-display text-center">
                                Contact <span className="text-primary">Us</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed text-center">
                                Fill in this form to be part of the solution now!
                            </p>
                        </BlurFade>
                    </div>
                </section>

                <section className="px-4 md:px-6 py-20">
                    <div className="container max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-left">

                            {/* Left Side: Form */}
                            <BlurFade delay={0.2}>
                                <div className="p-8 md:p-10 rounded-[2.5rem] glass border border-border/50 relative overflow-hidden">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">
                                                            Name <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John Doe" {...field} className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left" />
                                                        </FormControl>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">
                                                            Email <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="john@example.com" type="email" {...field} className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left" />
                                                        </FormControl>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="purposeOfContact"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">
                                                            Purpose of Contact <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left">
                                                                    <SelectValue placeholder="Volunteer as a workshop speaker" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="volunteer">Volunteer as a workshop speaker</SelectItem>
                                                                <SelectItem value="host">Host an AI workshop in your school</SelectItem>
                                                                <SelectItem value="partner">Partner with us to scale AI education</SelectItem>
                                                                <SelectItem value="other">Other Enquiries</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="mobileNumber"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">
                                                            Mobile Number <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+60123456789" {...field} className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left" />
                                                        </FormControl>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="profession"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">
                                                            Profession <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left">
                                                                    <SelectValue placeholder="Teacher" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="teacher">Teacher</SelectItem>
                                                                <SelectItem value="volunteer">Volunteer</SelectItem>
                                                                <SelectItem value="student">Student</SelectItem>
                                                                <SelectItem value="parent">Parent</SelectItem>
                                                                <SelectItem value="nonprofit">Non Profit</SelectItem>
                                                                <SelectItem value="others">Others</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">Message</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Tell us about your inquiry..."
                                                                {...field}
                                                                value={field.value || ""}
                                                                className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl resize-none text-base text-left"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all group"
                                            >
                                                {isSubmitting ? (
                                                    "Sending..."
                                                ) : (
                                                    <>
                                                        SEND
                                                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </BlurFade>

                            {/* Right Side: Contact Info */}
                            <BlurFade delay={0.3}>
                                <div className="space-y-12 text-left">
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-left">Let's Connect</h2>
                                        <p className="text-lg text-muted-foreground font-light leading-relaxed text-left">
                                            Whether you're interested in our educational programs, looking to partner with us, or have general inquiries, we're here to help.
                                        </p>
                                    </div>

                                    <div className="space-y-4 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-left max-w-md">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-left">Email Us</h3>
                                            <div className="mt-2 space-y-1 text-left">
                                                <a href="mailto:hello@rakantutor.org" className="block text-primary hover:underline font-light break-all text-sm md:text-base text-left">hello@rakantutor.org</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BlurFade>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
