import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlbum } from 'app/shared/model/album.model';

type EntityResponseType = HttpResponse<IAlbum>;
type EntityArrayResponseType = HttpResponse<IAlbum[]>;

@Injectable({ providedIn: 'root' })
export class AlbumService {
    private resourceUrl = SERVER_API_URL + 'api/albums';

    constructor(private http: HttpClient) {}

    create(album: IAlbum): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(album);
        return this.http
            .post<IAlbum>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(album: IAlbum): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(album);
        return this.http
            .put<IAlbum>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAlbum>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAlbum[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(album: IAlbum): IAlbum {
        const copy: IAlbum = Object.assign({}, album, {
            year: album.year != null && album.year.isValid() ? album.year.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.year = res.body.year != null ? moment(res.body.year) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((album: IAlbum) => {
            album.year = album.year != null ? moment(album.year) : null;
        });
        return res;
    }
}