import type {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const clonedRequest = request.clone({
			withCredentials: true,
		});

		return next.handle(clonedRequest);
	}
}
