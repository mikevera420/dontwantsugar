import { Check, X, Minus } from "lucide-react";

type FeatureValue = boolean | "partial";

interface Feature {
  name: string;
  willpower: FeatureValue;
  dietPrograms: FeatureValue;
  trackingApps: FeatureValue;
  cravingCode: FeatureValue;
}

const features: Feature[] = [
  {
    name: "Personalized to your patterns",
    willpower: false,
    dietPrograms: false,
    trackingApps: false,
    cravingCode: true,
  },
  {
    name: "Provides structure",
    willpower: false,
    dietPrograms: true,
    trackingApps: true,
    cravingCode: true,
  },
  {
    name: "Ongoing human support",
    willpower: false,
    dietPrograms: "partial" as const,
    trackingApps: false,
    cravingCode: true,
  },
  {
    name: "Teaches why cravings happen",
    willpower: false,
    dietPrograms: false,
    trackingApps: false,
    cravingCode: true,
  },
  {
    name: "Sustainable without restriction",
    willpower: false,
    dietPrograms: false,
    trackingApps: false,
    cravingCode: true,
  },
];

const StatusIcon = ({ value, highlighted }: { value: boolean | "partial"; highlighted?: boolean }) => {
  if (value === true) {
    return (
      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${highlighted ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"}`}>
        <Check className="w-4 h-4" />
      </div>
    );
  }
  if (value === "partial") {
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  }
  return <X className="w-5 h-5 text-muted-foreground/40" />;
};

const ComparisonTable = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          How This Approach Compares
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground"></th>
                <th className="py-4 px-4 font-medium text-muted-foreground text-center">
                  Willpower Alone
                </th>
                <th className="py-4 px-4 font-medium text-muted-foreground text-center">
                  Diet Programs
                </th>
                <th className="py-4 px-4 font-medium text-muted-foreground text-center">
                  Tracking Apps
                </th>
                <th className="py-4 px-6 font-semibold text-primary text-center bg-primary/8 rounded-t-xl border-x border-t border-primary/20">
                  Our Coaching
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={index % 2 === 0 ? "bg-muted/30" : ""}
                >
                  <td className="py-4 px-4 text-foreground">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <StatusIcon value={feature.willpower} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <StatusIcon value={feature.dietPrograms} />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <StatusIcon value={feature.trackingApps} />
                    </div>
                  </td>
                  <td className={`py-4 px-6 text-center bg-primary/8 border-x border-primary/20 ${index === features.length - 1 ? "rounded-b-xl border-b" : ""}`}>
                    <div className="flex justify-center">
                      <StatusIcon value={feature.cravingCode} highlighted />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <p className="font-medium text-foreground mb-3">{feature.name}</p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Willpower</p>
                  <div className="flex justify-center">
                    <StatusIcon value={feature.willpower} />
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Diet</p>
                  <div className="flex justify-center">
                    <StatusIcon value={feature.dietPrograms} />
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Apps</p>
                  <div className="flex justify-center">
                    <StatusIcon value={feature.trackingApps} />
                  </div>
                </div>
                <div className="bg-primary/8 rounded-lg py-1 border border-primary/20">
                  <p className="text-primary font-medium mb-1">Our Coaching</p>
                  <div className="flex justify-center">
                    <StatusIcon value={feature.cravingCode} highlighted />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
