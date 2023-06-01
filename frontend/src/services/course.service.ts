import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from 'rxjs';
import { Course } from "src/app/app.component";

@Injectable({ providedIn: 'root' })

export class CourseService
{
    constructor(private http: HttpClient) { }

    private url = 'https://localhost:5000/api/Course/courses';

    getCourses(): Observable<any> {
        return this.http.get(this.url)
            .pipe(
                tap(_ => console.log('fetched courses')),
                catchError(this.handleError<Course[]>('getCourses', []))
            );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
             // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }

}