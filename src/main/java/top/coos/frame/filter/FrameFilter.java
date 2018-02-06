package top.coos.frame.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "*.html")
public class FrameFilter implements Filter {

	public void destroy() {

	}

	public void initSessionAttribute(HttpServletRequest request) {

	}

	/**
	 * 当有用户访问web应用中的资源时，该过滤器就会进行拦截
	 */
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		try {
			if (validate(request, response)) {
				chain.doFilter(req, res);
			}
		} catch (IOException e) {
			throw new IOException(e);
		} catch (ServletException e) {
			throw new ServletException(e);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return;
	}

	private boolean validate(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String method = request.getMethod();
		if (method.equals("GET")) {
		}
		return true;
	}

	/**
	 * web服务器启动时就会初始化该Filter
	 */
	public void init(FilterConfig filterConfig) throws ServletException {

	}
}
