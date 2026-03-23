import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Locale;

public class BlochSimulator {

    public static void main(String[] args) throws IOException {
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        
        // Context per i CALCOLI FISICI
        server.createContext("/calculate", new BlochHandler());
        
        // Context per i FILE STATICI (HTML e JS)
        server.createContext("/", new StaticFileHandler());
        
        server.setExecutor(null); 
        System.out.println("Server Unificato Vida 3T avviato sulla porta " + port);
        server.start();
    }

    // GESTORE DEI CALCOLI (REST API)
    static class BlochHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Qui inseriamo la tua logica solveRelaxation
            String response = solveRelaxation(0.85, 0.85, 0.0, 0.0, 810.0, 42.0, 100.0);
            
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }

    // GESTORE DEI FILE (Serve index.html e app.js)
    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/")) path = "/index.html"; // Default alla home
            
            try {
                // Rimuove il primo slash per cercare il file nella cartella corrente
                byte[] fileBytes = Files.readAllBytes(Paths.get(path.substring(1)));
                
                // Imposta il tipo di file corretto
                if (path.endsWith(".html")) exchange.getResponseHeaders().add("Content-Type", "text/html");
                if (path.endsWith(".js")) exchange.getResponseHeaders().add("Content-Type", "application/javascript");
                
                exchange.sendResponseHeaders(200, fileBytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(fileBytes);
                os.close();
            } catch (IOException e) {
                String error = "404 File Not Found: " + path;
                exchange.sendResponseHeaders(404, error.length());
                OutputStream os = exchange.getResponseBody();
                os.write(error.getBytes());
                os.close();
            }
        }
    }

    public static String solveRelaxation(double m0, double mx0, double my0, double mz0, double t1, double t2, double dt) {
        double eT2 = Math.exp(-dt / t2);
        double mx = mx0 * eT2;
        double my = my0 * eT2;
        double eT1 = Math.exp(-dt / t1);
        double mz = mz0 * eT1 + m0 * (1.0 - eT1);
        double signal = Math.sqrt(mx * mx + my * my);
        return String.format(Locale.US, "{\"Mx\": %.8f, \"My\": %.8f, \"Mz\": %.8f, \"Signal\": %.8f}", mx, my, mz, signal);
    }
}
