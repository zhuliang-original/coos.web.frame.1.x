package top.coos.frame.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import top.coos.servlet.DefaultServlet;
import top.coos.servlet.annotation.RequestMapping;
import top.coos.servlet.model.ModelMap;
import top.coos.web.constant.WebConstant;

@WebServlet(urlPatterns = "/index/*")
public class IndexServlet extends DefaultServlet {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;

	@RequestMapping("/index.html")
	public String index(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

		map.put(WebConstant.Param.THIS_PAGE_ID, "index/index.jsp");
		return WebConstant.Page.WEB_INF_VIEW_PUBLIC_JSP;
	}

}
