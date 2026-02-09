import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['s3-bucket-henrucci.s3.us-east-2.amazonaws.com', 's3-bucket-henrucci.s3.amazonaws.com'],
  },
};


export default nextConfig;
