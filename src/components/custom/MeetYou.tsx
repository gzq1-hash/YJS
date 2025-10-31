"use client";

import React from 'react';
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import {Text} from "@radix-ui/themes";

export default function MeetYou() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full flex items-center justify-center w-full mt-20 mb-10">
      {/*<MacbookScroll*/}
      {/*  title={*/}
      {/*    <span>*/}
      {/*      期待与你相遇*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  badge={*/}
      {/*    <a href="https://x.com/CryptoCashCtrl">*/}
      {/*      <Badge className="h-20 w-20 transform -rotate-24" />*/}
      {/*    </a>*/}
      {/*  }*/}
      {/*  src={`/banner.png`}*/}
      {/*  showGradient={false}*/}
      {/*/>*/}
      <Text size="9">期待与你相遇</Text>
    </div>
  );
}
// Peerlist logo
const Badge = ({ className }: { className?: string }) => {
  return (
    <img
      width="64"
      height="64"
      src="/logo.png"
      className={className}
    />
  );
}