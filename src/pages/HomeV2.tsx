import Header from "@/components/Header";
import HeroV2 from "@/components/v2/HeroV2";
import OrganisersV2 from "@/components/v2/OrganisersV2";
import EventOverviewV2 from "@/components/v2/EventOverviewV2";
import TracksV2 from "@/components/v2/TracksV2";
import PrizesV2 from "@/components/v2/PrizesV2";
import RegistrationV2 from "@/components/v2/RegistrationV2";
import CompetitionFlowV2 from "@/components/v2/CompetitionFlowV2";
import CTAV2 from "@/components/v2/CTAV2";
import FAQV2 from "@/components/v2/FAQV2";
import Footer from "@/components/Footer";
import BlurFade from "@/components/ui/blur-fade";
const HomeV2 = () => {
  return <div className="min-h-screen bg-black transition-colors duration-300 overflow-x-hidden">
            <Header />
            <main className="relative">
                <HeroV2 />

                <BlurFade inView>
                    <OrganisersV2 className="" />
                </BlurFade>

                <BlurFade inView>
                    <EventOverviewV2 />
                </BlurFade>

                <BlurFade inView>
                    <TracksV2 />
                </BlurFade>

                <BlurFade inView>
                    <PrizesV2 />
                </BlurFade>

                <BlurFade inView>
                    <RegistrationV2 />
                </BlurFade>

                <BlurFade inView>
                    <CompetitionFlowV2 />
                </BlurFade>

                <CTAV2 />

                <BlurFade inView>
                    <FAQV2 />
                </BlurFade>
            </main>
            <Footer />
        </div>;
};
export default HomeV2;