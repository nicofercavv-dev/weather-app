function WeatherInfo({
  src,
  title1,
  title2,
}: {
  src: string;
  title1: string;
  title2: string;
}) {
  
  return (
    <div>
      <img src={src} alt="Ícone de informação" />
      <p>{title1}</p>
      <p>{title2}</p>
    </div>
  );
}

export default WeatherInfo;
