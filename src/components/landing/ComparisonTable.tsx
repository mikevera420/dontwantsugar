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

const StatusIcon = ({ value }: { value: boolean | "partial" }) => {
  if (value === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Check className="w-4 h-4 text-primary" />
      </div>
    );
  }
  if (value === "partial") {
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  }
  return <X className="w-5 h-5 text-muted-foreground/50" />;
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
                <th className="py-4 px-4 font-semibold text-primary text-center">
                  The Craving Code
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
                  <td className="py-4 px-4 text-center bg-primary/5">
                    <div className="flex justify-center">
                      <StatusIcon value={feature.cravingCode} />
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
                <div className="bg-primary/5 rounded-lg py-1">
                  <p className="text-primary font-medium mb-1">Craving Code</p>
                  <div className="flex justify-center">
                    <StatusIcon value={feature.cravingCode} />
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
