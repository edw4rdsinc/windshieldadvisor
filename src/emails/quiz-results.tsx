import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
  Button,
} from '@react-email/components';
import type { Quiz, QuizResult, Severity } from '@/types/quiz';

interface QuizResultsEmailProps {
  quiz: Quiz;
  result: QuizResult;
  recipientEmail: string;
}

const getSeverityColor = (severity: Severity | string): string => {
  switch (severity) {
    case 'safe':
      return '#10b981'; // green
    case 'caution':
      return '#f59e0b'; // yellow/orange
    case 'critical':
      return '#ef4444'; // red
    default:
      return '#3b82f6'; // blue (info)
  }
};

const getSeverityLabel = (severity: Severity | string): string => {
  switch (severity) {
    case 'safe':
      return 'All Clear';
    case 'caution':
      return 'Needs Attention';
    case 'critical':
      return 'Urgent Action Required';
    default:
      return 'Information';
  }
};

export default function QuizResultsEmail({
  quiz,
  result,
  recipientEmail,
}: QuizResultsEmailProps) {
  const severity = (result.result.severity || 'info') as Severity;
  const severityColor = getSeverityColor(severity);

  return (
    <Html>
      <Head />
      <Preview>
        {result.result.title || `Your ${quiz.title} Results`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Windshield Advisor</Heading>
            <Text style={subtitle}>Your Auto Glass Safety Experts</Text>
          </Section>

          {/* Severity Banner */}
          <Section style={{ ...severityBanner, backgroundColor: severityColor }}>
            <Text style={severityText}>
              {result.result.title || getSeverityLabel(severity)}
            </Text>
          </Section>

          {/* Quiz Title */}
          <Section style={section}>
            <Heading style={h2}>{quiz.title}</Heading>
            <Text style={text}>
              Thank you for completing our quiz. Here are your personalized results:
            </Text>
          </Section>

          {/* Summary */}
          {result.result.summary && (
            <Section style={section}>
              <Text style={summaryText}>{result.result.summary}</Text>
            </Section>
          )}

          {/* Explanation */}
          {result.result.explanation && (
            <Section style={section}>
              <Text style={text}>{result.result.explanation}</Text>
            </Section>
          )}

          {/* Score/Percentage */}
          {typeof result.result.totalScore === 'number' && (
            <Section style={scoreSection}>
              <Text style={scoreLabel}>Your Score</Text>
              <Text style={scoreValue}>{result.result.totalScore} points</Text>
              <Text style={scoreStatus}>{getSeverityLabel(severity)}</Text>
            </Section>
          )}

          {typeof result.result.percentage === 'number' && (
            <Section style={scoreSection}>
              <Text style={scoreLabel}>Your Score</Text>
              <Text style={scoreValue}>
                {Math.round(result.result.percentage * 100)}%
              </Text>
              <Text style={text}>
                {result.result.correctCount} out of {result.result.totalQuestions} correct
              </Text>
            </Section>
          )}

          {/* Cost Breakdown */}
          {result.result.costBreakdown && (
            <Section style={section}>
              <Heading style={h3}>Cost Breakdown</Heading>
              <table style={costTable}>
                <tr>
                  <td style={costLabel}>Insurance Coverage:</td>
                  <td style={costValue}>
                    {result.result.costBreakdown.covered ? '✓ Yes' : '✗ No'}
                  </td>
                </tr>
                <tr>
                  <td style={costLabel}>Your Deductible:</td>
                  <td style={costValue}>${result.result.costBreakdown.deductible}</td>
                </tr>
                <tr>
                  <td style={costLabel}>Estimated Total Cost:</td>
                  <td style={costValue}>${result.result.costBreakdown.estimatedCost}</td>
                </tr>
                <tr style={{ backgroundColor: '#eff6ff' }}>
                  <td style={costLabel}>
                    <strong>Your Out of Pocket:</strong>
                  </td>
                  <td style={{ ...costValue, fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
                    ${result.result.costBreakdown.yourCost}
                  </td>
                </tr>
              </table>
            </Section>
          )}

          {/* Next Steps */}
          {result.result.nextSteps && result.result.nextSteps.length > 0 && (
            <Section style={infoBox}>
              <Heading style={h3}>Recommended Next Steps</Heading>
              <ul style={list}>
                {result.result.nextSteps.map((step, index) => (
                  <li key={index} style={listItem}>
                    {step}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Recommendations */}
          {result.result.recommendations && result.result.recommendations.length > 0 && (
            <Section style={infoBox}>
              <Heading style={h3}>Recommended Actions</Heading>
              <ul style={list}>
                {result.result.recommendations.map((rec, index) => (
                  <li key={index} style={listItem}>
                    {rec}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Warnings */}
          {result.result.warnings && result.result.warnings.length > 0 && (
            <Section style={warningBox}>
              <Heading style={h3}>Important Considerations</Heading>
              <ul style={list}>
                {result.result.warnings.map((warning, index) => (
                  <li key={index} style={listItem}>
                    {warning}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Notes */}
          {result.result.notes && result.result.notes.length > 0 && (
            <Section style={infoBox}>
              <Heading style={h3}>Important Notes</Heading>
              <ul style={list}>
                {result.result.notes.map((note, index) => (
                  <li key={index} style={listItem}>
                    {note}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Hr style={hr} />

          {/* CTA - Call Vero */}
          <Section style={ctaSection}>
            <Heading style={h2}>Ready for Expert Service?</Heading>
            <Text style={ctaText}>
              Talk to a certified windshield specialist who understands your needs
            </Text>
            <Button style={callButton} href="tel:971-317-8376">
              Call Vero Autoglass: 971-317-8376
            </Button>
            <Text style={ctaDetails}>
              Portland Metro Area • Mobile Service Available
            </Text>
            <Section style={badges}>
              <Text style={badge}>✓ AGSC Certified</Text>
              <Text style={badge}>✓ ADAS Calibration</Text>
              <Text style={badge}>✓ OEM Glass</Text>
              <Text style={badge}>✓ Lifetime Warranty</Text>
            </Section>
            <ul style={benefitsList}>
              <li>Free quotes over the phone</li>
              <li>Insurance claims handled for you</li>
              <li>Same-day service available</li>
            </ul>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions about your results?{' '}
              <Link href="https://windshieldadvisor.info" style={link}>
                Visit our website
              </Link>{' '}
              for more information.
            </Text>
            <Text style={footerText}>
              <Link href={`https://windshieldadvisor.info/quiz/${quiz.slug}`} style={link}>
                Retake this quiz
              </Link>{' '}
              |{' '}
              <Link href="https://windshieldadvisor.info/blog" style={link}>
                Read our blog
              </Link>
            </Text>
            <Text style={disclaimer}>
              This email was sent to {recipientEmail} because you completed a quiz on
              Windshield Advisor. This is not a diagnostic report - always consult with a
              certified auto glass professional for specific recommendations.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#1e293b',
};

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const subtitle = {
  color: '#94a3b8',
  fontSize: '14px',
  margin: '8px 0 0 0',
};

const severityBanner = {
  padding: '20px',
  textAlign: 'center' as const,
  margin: '0',
};

const severityText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const section = {
  padding: '24px 20px',
};

const h2 = {
  color: '#1e293b',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const h3 = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const summaryText = {
  color: '#1f2937',
  fontSize: '18px',
  lineHeight: '28px',
  margin: '0',
  fontWeight: '500',
};

const scoreSection = {
  padding: '24px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  margin: '0 20px 20px',
};

const scoreLabel = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const scoreValue = {
  color: '#1e293b',
  fontSize: '48px',
  fontWeight: 'bold',
  margin: '0',
};

const scoreStatus = {
  color: '#374151',
  fontSize: '16px',
  margin: '8px 0 0',
};

const infoBox = {
  backgroundColor: '#eff6ff',
  border: '2px solid #3b82f6',
  borderRadius: '8px',
  padding: '20px',
  margin: '0 20px 20px',
};

const warningBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #f59e0b',
  borderRadius: '8px',
  padding: '20px',
  margin: '0 20px 20px',
};

const list = {
  margin: '0',
  paddingLeft: '20px',
};

const listItem = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '8px',
};

const costTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  marginTop: '12px',
};

const costLabel = {
  padding: '12px',
  fontSize: '14px',
  color: '#6b7280',
  borderBottom: '1px solid #e5e7eb',
};

const costValue = {
  padding: '12px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  textAlign: 'right' as const,
  borderBottom: '1px solid #e5e7eb',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 20px',
};

const ctaSection = {
  padding: '32px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#1e40af',
  margin: '0',
};

const ctaText = {
  color: '#bfdbfe',
  fontSize: '18px',
  margin: '0 0 24px',
  fontWeight: '600',
};

const callButton = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  color: '#1e40af',
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '0 0 16px',
};

const ctaDetails = {
  color: '#bfdbfe',
  fontSize: '14px',
  margin: '16px 0',
};

const badges = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  justifyContent: 'center',
  gap: '8px',
  margin: '16px 0',
};

const badge = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  fontSize: '12px',
  padding: '6px 12px',
  borderRadius: '16px',
  display: 'inline-block',
  margin: '4px',
};

const benefitsList = {
  color: '#bfdbfe',
  fontSize: '14px',
  listStyle: 'none',
  padding: '0',
  margin: '16px 0 0',
};

const footer = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 8px',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const disclaimer = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '16px 0 0',
};
