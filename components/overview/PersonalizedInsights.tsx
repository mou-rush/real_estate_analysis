type Insight = {
  text: string;
  links: {
    text: string;
    url: string;
  }[];
};

type PersonalizedInsightsProps = {
  insights: Insight[];
};

export const PersonalizedInsights = ({
  insights,
}: PersonalizedInsightsProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Personalized Insights</h3>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        {insights.map((insight, index) => (
          <li key={index}>
            {insight.text.split(/(\{[0-9]+\})/).map((part, partIndex) => {
              if (part.match(/\{[0-9]+\}/)) {
                const linkIndex = parseInt(part.replace(/[\{\}]/g, ""));
                const link = insight.links[linkIndex];
                return (
                  <a key={partIndex} href={link.url} className="text-blue-600">
                    {link.text}
                  </a>
                );
              }
              return part;
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};
