export const cycles =  ['Primaire', 'Collège', 'Lycée'];
export const hexToRgba = (hex: string , alpha = 1): string  => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const baseUrl = ( uri: string | undefined ) => {
  const serverUrl = 'http://localhost/Mirva-School-Management/Server/' ; 

  if ( uri !== undefined  ){ 
    return `${ serverUrl }${ uri }` ; 
  }else { 
    return `${ serverUrl }` ; 
  }
}