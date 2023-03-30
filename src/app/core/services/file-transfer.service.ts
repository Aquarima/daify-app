import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from '../../../environments/environment';
import {Challenge} from "../models";

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  constructor(private http: HttpClient) {
  }

  uploadChallengeIcon(blob: Blob, challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/file/transfer/challenge/${challenge.id}/icon/upload`, blob);
  }

  uploadChallengeCover(blob: Blob, challenge: Challenge) {
    return this.http.post<any>(`${env.apiUrl}/file/transfer/challenge/${challenge.id}/cover/upload`, blob);
  }
}
