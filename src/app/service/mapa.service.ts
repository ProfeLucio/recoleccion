import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private apiUrl = 'http://apirecoleccion.gonzaloandreslucio.com/api';

  // NUEVO: Guardará el ID del perfil que el usuario seleccione
  public activeProfileId: string | null = null;

  constructor(private http: HttpClient) { }

  // --- MÉTODO NUEVO PARA OBTENER LOS PERFILES ---
  getPerfiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfiles`);
  }

  // CAMBIO: El método getRutas ahora depende del perfil activo
  getRutas(): Observable<any> {
    if (!this.activeProfileId) {
      // Si no hay perfil, no hacemos la llamada y devolvemos un array vacío.
      return of({ data: [] });
    }
    // Si hay perfil, lo enviamos como parámetro.
    return this.http.get(`${this.apiUrl}/rutas`, { params: { perfil_id: this.activeProfileId } });
  }

  getCalles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calles`);
  }

  createRuta(nuevaRuta: { nombre_ruta: string; calles: string[] }): Observable<any> {
    if (!this.activeProfileId) {
      // Si por alguna razón no hay perfil, devolvemos un error.
      return new Observable(observer => observer.error('No hay un perfil seleccionado para guardar la ruta.'));
    }

    // 1. Creamos el objeto que se enviará a la API.
    const payload = {
      ...nuevaRuta, // Incluye nombre_ruta y calles
      perfil_id: this.activeProfileId // 2. AÑADIMOS EL ID DEL PERFIL ACTIVO
    };

    // 3. Enviamos el objeto completo (payload) al backend.
    return this.http.post(`${this.apiUrl}/rutas`, payload);
  }
}
