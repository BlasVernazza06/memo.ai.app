import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps {
  username: string;
  resetUrl: string;
}

export default function ForgotPasswordEmail(props: ForgotPasswordEmailProps) {
  const { username, resetUrl} = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[16px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{username}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[24px]">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                If the button above doesn&apos;t work, copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 break-all">
                {resetUrl}
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="border-t border-solid border-gray-200 pt-[24px] mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[12px]">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                • If you didn&apos;t request this password reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                • This link will expire in 24 hours
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                • For security, never share this link with anyone
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Best regards,<br />
                The Security Team
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                123 Security Street, Safe City, SC 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © 2025 Your Company. All rights reserved. | 
                <a href="#" className="text-gray-500 underline ml-[4px]">Unsubscribe</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};