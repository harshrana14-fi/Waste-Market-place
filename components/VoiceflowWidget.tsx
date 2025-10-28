'use client';

import Script from 'next/script';

export default function VoiceflowWidget() {
  return (
    <Script
      src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
      strategy="afterInteractive"
      onLoad={() => {
        (window as any).voiceflow?.chat.load({
          verify: { projectID: '6900a28aa757dc1d38527412' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: 'https://runtime-api.voiceflow.com'
          }
        });
      }}
    />
  );
}


