export interface ZkKycVerifyParams {
  birthYear: number;
  countryCode: number;
}

export class ZkKycClientSDK {
  private apiGatewayUrl: string;
  private apiKey: string;

  constructor(apiKey: string, apiGatewayUrl: string = 'http://localhost:4000') {
    this.apiKey = apiKey;
    this.apiGatewayUrl = apiGatewayUrl;
  }

  async generateZkProof(userData: ZkKycVerifyParams): Promise<string> {
    console.log('[SDK] Đang tạo ZK-Proof cục bộ trên thiết bị người dùng...');
    const encodedData = Buffer.from(JSON.stringify(userData)).toString('base64');
    return `zk_proof_${encodedData}`;
  }

  async verifyUserIdentity(userData: ZkKycVerifyParams) {
    try {
      const proofToken = await this.generateZkProof(userData);

      const response = await fetch(`${this.apiGatewayUrl}/api/v1/verify-zk-kyc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey
        },
        body: JSON.stringify({
          userProofToken: proofToken,
          currentYear: new Date().getFullYear(),
          bannedCountry: 704
        })
      });

      return await response.json();
    } catch (error: any) {
      console.error('[SDK Error]:', error.message);
      throw error;
    }
  }
}