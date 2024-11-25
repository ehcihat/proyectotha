import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error:any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>¡Vaya!</h1>
      <p>Lo siento, parece que esta página no existe.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}