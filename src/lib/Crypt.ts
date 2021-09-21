import crypto from 'crypto';

type Hash = {
  iv: string;
  content: string;
};

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

const encrypt = (value: any, secretKey: string) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey.replaceAll('-', ''),
    iv,
  );
  const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

  return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
};

const decrypt = (hashString: string, secretKey: string) => {
  const hashArray = hashString.split('.');
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey.replaceAll('-', ''),
    Buffer.from(hashArray[0], 'hex'),
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hashArray[1], 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export { encrypt, decrypt };
