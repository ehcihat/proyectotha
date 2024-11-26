import { useRouteError } from "react-router-dom";
import Menu from "../components/Menu";
export default function ErrorPage() {
  const error:any = useRouteError();
  console.error(error);

  return (
    <>
    <Menu></Menu>
    <div id="error-page">
      <h1>¡Vaya!</h1>
      <p>Lo siento, parece que esta página no existe.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
    </>
  );
}