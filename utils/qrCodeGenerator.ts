import QRCode from 'qrcode';

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrCodeOptions {
    text: string;
    size: number;
    errorCorrectionLevel: QrErrorCorrectionLevel;
}

export const generateQrCodeDataUrl = (options: QrCodeOptions): Promise<string> =>
    QRCode.toDataURL(options.text, {
        width: options.size,
        margin: 2,
        errorCorrectionLevel: options.errorCorrectionLevel,
    });
