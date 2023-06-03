import { useState } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistic from './Statistic/Statistic';
import Notification from './Notification/Notification';
import Layout from './Layout/Layout';

const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = state => {
    setState(prevState => ({ ...prevState, [state]: prevState[state] + 1 }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    const total = countTotalFeedback();
    return Math.round((good / total) * 100);
  };

  const { good, neutral, bad } = state;
  // робимо змінну бо хуки не приймають функцію так як я передав пропТипи числом
  const totalFeeadback = countTotalFeedback();
  const positiveFeedbackPercentage = countPositiveFeedbackPercentage();
  const options = Object.keys(state);

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistic
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeeadback}
            positivePercentage={positiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Layout>
  );
};

export default App;
