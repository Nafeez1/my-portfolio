import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Polling() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const candidates = [
    { id: 1, name: 'Candidate A', percentage: 48, votes: '2.4M' },
    { id: 2, name: 'Candidate B', percentage: 44, votes: '2.2M' },
    { id: 3, name: 'Undecided', percentage: 8, votes: '400K' },
  ];

  const handleVote = () => {
    if (selectedCandidate) {
      setHasVoted(true);
      setTimeout(() => {
        setHasVoted(false);
        setSelectedCandidate(null);
      }, 3000);
    }
  };

  return (
    <section id="polling" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <p className="text-gold-primary text-sm font-semibold tracking-widest uppercase">
            Live Polling Data
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary">
            2026 Presidential Predictions
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Real-time polling analytics with institutional-grade accuracy. Updated every minute.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
              className={`card cursor-pointer transition-all duration-300 ${
                selectedCandidate === candidate.id
                  ? 'ring-2 ring-gold-primary border-gold-highlight'
                  : 'hover:border-gold-primary'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-serif font-semibold text-text-primary">
                    {candidate.name}
                  </h3>
                  {selectedCandidate === candidate.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-gold-primary"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold gradient-gold">{candidate.percentage}%</span>
                    <span className="text-text-secondary text-sm">{candidate.votes} votes</span>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2.5 bg-dark-card rounded-full overflow-hidden border border-gold-primary/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${candidate.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.3 }}
                      className="h-full bg-gradient-to-r from-gold-primary to-gold-highlight"
                    />
                  </div>
                </div>

                {/* Trend indicator */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gold-primary">↑</span>
                  <span className="text-text-secondary">+2.3% this week</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center space-y-6"
        >
          <h3 className="text-2xl font-serif font-semibold text-text-primary">
            Cast Your Prediction
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto">
            Participate in real-time polling and contribute to election predictions. Your voice matters.
          </p>

          <button
            onClick={handleVote}
            disabled={!selectedCandidate || hasVoted}
            className={`btn-primary mx-auto transition-all ${
              !selectedCandidate || hasVoted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {hasVoted ? '✓ Vote Recorded' : selectedCandidate ? 'Submit Vote' : 'Select Candidate'}
          </button>

          {hasVoted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold-primary text-sm font-semibold"
            >
              Thank you for your participation. Results updated.
            </motion.div>
          )}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Votes', value: '5M+' },
            { label: 'Poll Accuracy', value: '98.2%' },
            { label: 'Active Voters', value: '500K+' },
            { label: 'Updates/Min', value: '1000+' },
          ].map((stat, i) => (
            <div key={i} className="card !p-4 text-center">
              <p className="text-gold-primary text-2xl font-bold">{stat.value}</p>
              <p className="text-text-secondary text-xs mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gold divider */}
      <div className="gold-divider mt-20" />
    </section>
  );
}
