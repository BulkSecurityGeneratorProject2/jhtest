import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhtestSharedModule } from 'app/shared';
import {
    TrackComponent,
    TrackDetailComponent,
    TrackUpdateComponent,
    TrackDeletePopupComponent,
    TrackDeleteDialogComponent,
    trackRoute,
    trackPopupRoute
} from './';

const ENTITY_STATES = [...trackRoute, ...trackPopupRoute];

@NgModule({
    imports: [JhtestSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TrackComponent, TrackDetailComponent, TrackUpdateComponent, TrackDeleteDialogComponent, TrackDeletePopupComponent],
    entryComponents: [TrackComponent, TrackUpdateComponent, TrackDeleteDialogComponent, TrackDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhtestTrackModule {}
