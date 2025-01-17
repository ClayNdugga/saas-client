export interface ApiResponse<T> {
    status: 'success' | 'error';   
    message: string;              
    data?: T;                      
    error?: string;                
    timestamp?: string;            
}