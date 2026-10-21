import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint kiểm tra sức khỏe của API Server
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'ZK-KYC API Gateway is running' });
});

// Endpoint B2B gọi xác thực ZK-Proof (Pay-per-verification)
app.post('/api/v1/verify-zk-kyc', async (req: Request, res: Response) => {
  try {
    const apiKey = req.headers['x-api-key'];
    const { userProofToken, currentYear, bannedCountry } = req.body;

    // 1. Kiểm tra API Key của doanh nghiệp
    if (!apiKey) {
      return res.status(401).json({ success: false, error: 'Thieu API Key B2B. Vui long kiem tra header x-api-key.' });
    }

    // 2. Gia lap verify ZK Proof (Se ket noi Midnight Proof Server o giai doan sau)
    console.log(`[ZK-Engine] Dang xac thuc Proof voi API Key: ${apiKey}`);

    // Giả lập kết quả thành công mà KHÔNG lưu hay tiết lộ dữ liệu cá nhân
    return res.status(200).json({
      success: true,
      isVerified: true,
      data: {
        proofValid: true,
        isOver18: true,
        isSanctioned: false
      },
      message: 'Xac thuc ZK-KYC thanh cong qua Midnight Network!'
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway dang chay tai port: ${PORT}`);
});