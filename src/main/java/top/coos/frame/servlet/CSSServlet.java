package top.coos.frame.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import top.coos.servlet.DefaultServlet;
import top.coos.servlet.annotation.RequestMapping;
import top.coos.servlet.model.ModelMap;
import top.coos.web.constant.WebConstant;

@WebServlet(urlPatterns = "/css/*")
public class CSSServlet extends DefaultServlet {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;

	@RequestMapping("/index.html")
	public String index(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

		map.put(WebConstant.Param.THIS_PAGE_ID, "/views/doc/css/index.jsp");
		return "/views/public.jsp";
	}

	@RequestMapping("/component.html")
	public String component(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

		map.put(WebConstant.Param.THIS_PAGE_ID, "/views/doc/css/component.jsp");
		return "/views/public.jsp";
	}
}
