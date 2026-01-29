import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
import DitheredBackground from "@/components/DitheredBackground";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactSchema = z.object({
        name: z.string().min(2, t("contact.form.validation.name")),
        email: z.string().email(t("contact.form.validation.email")),
        subject: z.string().min(5, t("contact.form.validation.subject")),
        message: z.string().min(10, t("contact.form.validation.message")),
    });

    type ContactValues = z.infer<typeof contactSchema>;

    const form = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactValues) => {
        try {
            setIsSubmitting(true);
            const { error } = await supabase.functions.invoke("handle-contact", {
                body: values,
            });

            if (error) throw error;

            toast.success(t("contact.toast.success"), {
                description: t("contact.toast.successDesc"),
            });
            form.reset();
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(t("contact.toast.error"), {
                description: t("contact.toast.errorDesc"),
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
                                {t("contact.hero.title")} <span className="text-primary">{t("contact.hero.titleHighlight")}</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed text-center">
                                {t("contact.hero.desc")}
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
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">{t("contact.form.name")}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={t("contact.form.namePlaceholder")} {...field} className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left" />
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
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">{t("contact.form.email")}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={t("contact.form.emailPlaceholder")} type="email" {...field} className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left" />
                                                        </FormControl>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">{t("contact.form.subject")}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={t("contact.form.subjectPlaceholder")} {...field} className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-xl h-12 text-base text-left" />
                                                        </FormControl>
                                                        <FormMessage className="text-left" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-foreground/80 font-display text-sm block text-left">{t("contact.form.message")}</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder={t("contact.form.messagePlaceholder")}
                                                                {...field}
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
                                                    t("contact.form.sending")
                                                ) : (
                                                    <>
                                                        {t("contact.form.send")}
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
                                        <h2 className="text-3xl font-bold font-display tracking-tight text-left">{t("contact.info.title")}</h2>
                                        <p className="text-lg text-muted-foreground font-light leading-relaxed text-left">
                                            {t("contact.info.desc")}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                                        <div className="space-y-4 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-left">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg text-left">{t("contact.info.email")}</h3>
                                                <div className="mt-2 space-y-1 text-left">
                                                    <a href="mailto:mingjackt@sunway.edu.my" className="block text-primary hover:underline font-light break-all text-sm md:text-base text-left">mingjackt@sunway.edu.my</a>
                                                    <a href="mailto:clement@sunway.edu.my" className="block text-primary hover:underline font-light break-all text-sm md:text-base text-left">clement@sunway.edu.my</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 p-6 rounded-2xl bg-green-500/5 border border-green-500/10 text-left">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                                <MessageCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg text-left">{t("contact.info.whatsapp")}</h3>
                                                <a href="https://wa.me/60192004268" target="_blank" rel="noopener noreferrer" className="mt-2 block text-green-600 hover:underline font-light text-left">
                                                    Jack at (019-200 4268)
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8 p-8 rounded-3xl glass border border-border/50 text-left">
                                        <div className="flex gap-4 text-left">
                                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center border border-border">
                                                <MapPin className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-lg text-left">{t("contact.info.locationTitle")}</h3>
                                                <p className="text-muted-foreground font-light mt-1 text-base text-left">
                                                    {t("contact.info.locationDesc")}
                                                </p>
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
