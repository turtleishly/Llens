import MeetTheTeamTemplate from "./Template";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BlurFade from "@/components/ui/blur-fade";

interface TeamMember {
    name: string;
    role: string;
    image?: string;
}

const founders: TeamMember[] = [
    { name: "Kai Song", role: "Co-Founder" },
    { name: "Kaveen", role: "Co-Founder" },
];

const directors: TeamMember[] = [
    { name: "Ee Vi", role: "Impact Director" },
    { name: "Angie", role: "Marketing Co-Director" },
    { name: "Hong Zhe", role: "Marketing Co-Director" },
    { name: "Ben", role: "Outreach Director" },
    { name: "Hong Liang", role: "Tech Director" },
    { name: "Jacklyn", role: "Content Director" },
    { name: "Emily", role: "Product Director" },
    { name: "Jay Yen Lim", role: "Finance Director" },
    { name: "Jie Yi Ng", role: "Secretary" },
];

const associates: Record<string, TeamMember[]> = {
    "Strategic Projects": [
        { name: "Xu Qian", role: "Strategic Project Associate" }
    ],
    "Impact": [
        { name: "Afifah", role: "Impact Associate" },
        { name: "Aizat Lee", role: "Impact Associate" },
        { name: "Hsien Wen", role: "Impact Associate" },
        { name: "Ven Vai", role: "Impact Associate" },
        { name: "Yi Ran", role: "Impact Associate" },
        { name: "Ze Pin", role: "Impact Associate" },
    ],
    "Marketing": [
        { name: "Adlina", role: "Marketing Associate" },
        { name: "Alyssa Hum", role: "Marketing Associate" },
        { name: "Hasviniy Ganasan", role: "Marketing Associate" },
        { name: "Lynly", role: "Marketing Associate" },
        { name: "Vincent", role: "Marketing Associate" },
    ],
    "Outreach": [
        { name: "Amirul", role: "Outreach Associate" },
        { name: "Helena Chan", role: "Outreach Associate" },
        { name: "Jocelyn", role: "Outreach Associate" },
        { name: "Khor Wan Yan", role: "Outreach Associate" },
        { name: "Nur Farah Hidayah", role: "Outreach Associate" },
        { name: "Zoe Yee", role: "Outreach Associate" },
    ],
    "Tech": [
        { name: "Aiden", role: "Tech Associate" },
        { name: "Amzar", role: "Tech Associate" },
        { name: "Sharifah", role: "Tech Associate" },
        { name: "Shaun", role: "Tech Associate" },
    ],
    "Content": [
        { name: "Alma", role: "Content Associate" },
        { name: "Jun Qi Liew", role: "Content Associate" },
        { name: "Lillian", role: "Content Associate" },
        { name: "Pei Jhen", role: "Content Associate" },
        { name: "Swetha Jayaprasad", role: "Content Associate" },
    ],
    "Product": [
        { name: "Liang Yin Xian", role: "Product Associate" },
        { name: "Kai Qian", role: "Product Associate" },
    ]
};

const MemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="overflow-hidden border-none bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group h-full">
        <CardContent className="p-0">
            <AspectRatio ratio={4 / 5} className="bg-muted overflow-hidden relative">
                {member.image ? (
                    <img src={member.image} alt={member.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/30 text-secondary-foreground">
                        <span className="text-4xl font-light tracking-widest text-primary/40">
                            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <p className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {member.role}
                    </p>
                </div>
            </AspectRatio>
            <div className="p-4 text-center">
                <h3 className="font-semibold text-lg line-clamp-1" title={member.name}>{member.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1" title={member.role}>{member.role}</p>
            </div>
        </CardContent>
    </Card>
);

const teamMembers: TeamMember[] = [
    ...founders,
    ...directors,
    ...associates["Strategic Projects"],
    ...associates["Impact"],
    ...associates["Marketing"],
    ...associates["Outreach"],
    ...associates["Tech"],
    ...associates["Content"],
    ...associates["Product"],
];

const MeetTheTeam = () => {
    return (
        <MeetTheTeamTemplate title="Meet the Team (2025-2026)">
            <div className="py-12 px-4 md:px-8">
                <div className="container mx-auto text-center mb-16">
                    <BlurFade>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
                            Students and professionals driving education impact
                        </p>
                    </BlurFade>
                </div>

                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
                        {teamMembers.map((member, idx) => (
                            <BlurFade key={member.name} delay={0.05 * idx} inView>
                                <MemberCard member={member} />
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>
        </MeetTheTeamTemplate>
    );
};

export default MeetTheTeam;
