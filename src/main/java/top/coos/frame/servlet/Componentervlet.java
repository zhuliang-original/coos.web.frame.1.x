package top.coos.frame.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import top.coos.servlet.DefaultServlet;
import top.coos.servlet.annotation.RequestMapping;
import top.coos.servlet.model.ModelMap;
import top.coos.web.constant.WebConstant;

@WebServlet(urlPatterns = "/component/*")
public class Componentervlet extends DefaultServlet {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;

	@RequestMapping("/form.html")
	public String form(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

		map.put(WebConstant.Param.THIS_PAGE_ID, "/views/doc/component/form.jsp");
		return "/views/public.jsp";
	}

	@RequestMapping("/other.html")
	public String other(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

		map.put(WebConstant.Param.THIS_PAGE_ID, "/views/doc/component/other.jsp");
		return "/views/public.jsp";
	}

	@RequestMapping("/js.html")
	public String js(HttpServletRequest request, HttpServletResponse response, ModelMap map) throws Exception {

		map.put(WebConstant.Param.THIS_PAGE_ID, "/views/doc/component/js.jsp");
		return "/views/public.jsp";
	}
}
