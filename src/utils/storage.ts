import { ipfsClient } from '../lib/ipfsClient';

interface PrescriptionPayload {
  [key: string]: any;
}

async function uploadPrescription(payloadObj: PrescriptionPayload): Promise<string> {
    const blob = new Blob([JSON.stringify(payloadObj)], { type: 'application/json' });
    const file = new File([blob], `prescription-${Date.now()}.json`);
    const result = await ipfsClient.add(file);
    // result.cid (CID object) -> string
    return result.cid.toString();
  }
  