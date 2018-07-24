export class HttpClient {
    

    getModels() {
        return fetch('/model.json')
            .then(result => {                
                return result.json();
            }).then(data => {
                return data;
            });
    }

    getAttribute(model) {
        if(model === 'Patient') {
            return fetch('/patient.json')
            .then(result => {                
                return result.json();
            }).then(data => {
                return data;
            });
        } else {
            return fetch('/doctor.json')
            .then(result => {                
                return result.json();
            }).then(data => {
                return data;
            });
        }
        
    }
}