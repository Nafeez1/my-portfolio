import { motion } from 'framer-motion';

export default function Results() {
  const insights = [
    { title: 'Engagement Rate', value: '87%', change: '+12%', color: 'from-gold-primary to-gold-highlight' },
    { title: 'Regional Strength', value: '28 States', change: 'Growing', color: 'from-gold-primary to-gold-highlight' },
    { title: 'Demographic Split', value: '52/48', change: 'Balanced', color: 'from-gold-primary to-gold-highlight' },
    { title: 'Prediction Margin', value: '+4.2%', change: 'Stable', color: 'from-gold-primary to-gold-highlight' },
  ];

  const trends = [
    { period: 'Week 1', value: 42 },
    { period: 'Week 2', value: 45 },
    { period: 'Week 3', value: 46 },
    { period: 'Week 4', value: 48 },
    { period: 'Today', value: 48 },
  ];

  return (
    <section id="results" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <p className="text-gold-primary text-sm font-semibold tracking-widest uppercase">
            Analytics Dashboard
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary">
            Predictive Insights
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Comprehensive election analytics powered by advanced data science and real-time polling aggregation.
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <p className="text-text-secondary text-sm mb-2">{insight.title}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent mb-2`}>
                {insight.value}
              </p>
              <p className="text-gold-primary text-xs">{insight.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-xl font-serif font-semibold text-text-primary mb-8">
            Polling Trend Analysis
          </h3>

          <div className="space-y-8">
            {/* Chart visualization */}
            <div className="h-64 flex items-end gap-2">
              {trends.map((trend, index) => {
                const maxValue = Math.max(...trends.map(t => t.value));
                const heightPercent = (trend.value / maxValue) * 100;

                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 1 }}
                    className="flex-1 relative group"
                  >
                    <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-gold-primary to-gold-highlight opacity-80 hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-gold-primary/20 to-transparent blur-md" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-dark-card border border-gold-primary/30 rounded px-3 py-1 text-center whitespace-nowrap">
                        <p className="text-gold-primary text-sm font-bold">{trend.value}%</p>
                        <p className="text-text-secondary text-xs">{trend.period}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Period labels */}
            <div className="flex justify-between text-text-secondary text-sm">
              {trends.map((trend, index) => (
                <span key={index} className="text-center flex-1">{trend.period}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Insights */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Regional breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-serif font-semibold text-text-primary mb-6">
              Regional Distribution
            </h3>
            <div className="space-y-4">
              {['Northeast', 'Midwest', 'South', 'West'].map((region, i) => {
                const percentages = [28, 24, 35, 13];
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-secondary text-sm">{region}</span>
                      <span className="text-gold-primary font-semibold text-sm">{percentages[i]}%</span>
                    </div>
                    <div className="h-2 bg-dark-card rounded-full border border-gold-primary/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentages[i]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-gold-primary to-gold-highlight"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Key findings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="text-xl font-serif font-semibold text-text-primary mb-6">
              Key Findings
            </h3>
            <ul className="space-y-4">
              {[
                'Voter engagement at all-time high (87%)',
                'Suburban voters trending toward change',
                'Youth turnout up 34% from last cycle',
                'Swing states tightening significantly',
              ].map((finding, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gold-primary text-xl leading-none">→</span>
                  <span className="text-text-secondary">{finding}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 card text-center space-y-6"
        >
          <h3 className="text-2xl font-serif font-semibold text-text-primary">
            Want Detailed Analysis?
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto">
            Access institutional-grade polling data, demographic breakdowns, and predictive models.
          </p>
          <button className="btn-primary">
            Request Full Report
          </button>
        </motion.div>
      </div>
    </section>
  );
}
