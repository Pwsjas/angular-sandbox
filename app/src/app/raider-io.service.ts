import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable, of, from } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RaiderIOService {

  constructor(private http: HttpClient) { }

  getCharacterProfile(characterName: String, serverName: String): Observable<any>{
    return this.http.get<any>(`https://raider.io/api/v1/characters/profile?region=us&realm=${serverName}&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent%2Cguild%2Craid_progression%2Cmythic_plus_best_runs%2Cmythic_plus_alternate_runs`);
  };

  getBasicCharacterProfile(characterName: String, serverName: String): Observable<any>{
    return this.http.get<any>(`https://raider.io/api/v1/characters/profile?region=us&realm=${serverName}&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent`);
  };

  getSeasonCutoff(): Observable<any> {
    return this.http.get<any>(`https://raider.io/api/v1/mythic-plus/season-cutoffs?season=season-df-3&region=us`);
  };

  getGuildData(guildName: String, serverName: String): Observable<any> {
    return this.http.get<any>(`https://raider.io/api/v1/guilds/profile?region=us&realm=${serverName}&name=${guildName}&fields=raid_progression%2Craid_rankings`)
  }
}
