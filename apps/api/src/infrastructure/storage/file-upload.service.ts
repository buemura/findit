import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createId } from '@paralleldrive/cuid2';
import { promises as fs } from 'fs';
import { join, extname } from 'path';

@Injectable()
export class FileUploadService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get('UPLOAD_DIR', 'uploads');
  }

  async saveFile(
    buffer: Buffer,
    originalName: string,
    subDir = '',
  ): Promise<string> {
    const ext = extname(originalName);
    const filename = `${createId()}${ext}`;
    const dir = join(process.cwd(), this.uploadDir, subDir);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(join(dir, filename), buffer);

    return subDir ? `${subDir}/${filename}` : filename;
  }

  async deleteFile(filepath: string): Promise<void> {
    const fullPath = join(process.cwd(), this.uploadDir, filepath);
    try {
      await fs.unlink(fullPath);
    } catch {
      // File might not exist, ignore error
    }
  }

  getFilePath(filename: string): string {
    return join(process.cwd(), this.uploadDir, filename);
  }
}
