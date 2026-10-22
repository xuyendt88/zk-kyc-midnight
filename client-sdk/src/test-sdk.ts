import { ZkKycClientSDK } from './index';

async function testSDK() {
  console.log('🚀 Đang chạy thử nghiệm Client SDK...');

  const sdk = new ZkKycClientSDK('TEST_B2B_API_KEY', 'http://localhost:4000');

  // Giả lập dữ liệu người dùng: Sinh năm 2000, Quốc tịch mã 100
  const result = await sdk.verifyUserIdentity({
    birthYear: 2000,
    countryCode: 100
  });

  console.log('✅ Phản hồi từ SDK:', result);
}

testSDK();