import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable, of, from } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RaiderIOService {

  constructor(private http: HttpClient) { }

  getCharacterProfile(characterName: String, serverName: String): Observable<Object>{
    return this.http.get<any>(`https://raider.io/api/v1/characters/profile?region=us&realm=${serverName}&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent`)
    // fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${serverName}&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent`)
    // .then((response) => response.json())
    // .then((data) => {
      
    // })
  }
}
