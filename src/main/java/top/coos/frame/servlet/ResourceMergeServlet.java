package top.coos.frame.servlet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import top.coos.servlet.DefaultServlet;
import top.coos.servlet.annotation.RequestMapping;
import top.coos.tool.array.ArrayHelper;
import top.coos.tool.compressor.CompressorTool;
import top.coos.tool.file.FileTool;
import top.coos.tool.zip.ZipTool;
import top.coos.web.constant.WebConstant;

@WebServlet(urlPatterns = "/resource/coos/merge/*")
public class ResourceMergeServlet extends DefaultServlet {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;

	private static String RESOURCES_FOLDER = null;

	private static String COOS_AND_PLUGINS_RESOURCES_FOLDER = null;

	@Override
	public void init(ServletConfig config) throws ServletException {

		RESOURCES_FOLDER = WebConstant.Path.getWebServerPath(config.getServletContext()) + "/resource/";
		COOS_AND_PLUGINS_RESOURCES_FOLDER = WebConstant.Path.getWebServerPath(config.getServletContext()) + "/resource/";
		super.init(config);
	}

	@RequestMapping("/resource.zip")
	public void resource(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String plugins_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "plugins/";
		String resource_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "resource/";
		try {

			FileTool.copyDir(COOS_folder + "css", resource_folder + "coos/css", null);
			FileTool.copyDir(COOS_folder + "images", resource_folder + "coos/images", null);
			FileTool.copyDir(COOS_folder + "js", resource_folder + "coos/js", null);

			FileTool.copyDir(plugins_folder, resource_folder + "plugins", null);
			String zipPath = COOS_AND_PLUGINS_RESOURCES_FOLDER + "resource.zip";
			ZipTool zipTool = new ZipTool(zipPath);
			zipTool.compressExe(resource_folder);

			File file = new File(zipPath);
			String fileName = "resource.zip";
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ new String(fileName.getBytes("ISO8859-1"), "UTF-8"));
			response.setContentLength((int) file.length());
			response.setContentType("application/zip");// 定义输出类型
			FileInputStream fis = new FileInputStream(file);
			BufferedInputStream buff = new BufferedInputStream(fis);
			byte[] b = new byte[1024];// 相当于我们的缓存
			long k = 0;// 该值用于计算当前实际下载了多少字节
			OutputStream myout = response.getOutputStream();// 从response对象中得到输出流,准备下载
			// 开始循环下载
			while (k < file.length()) {
				int j = buff.read(b, 0, 1024);
				k += j;
				myout.write(b, 0, j);
			}
			myout.flush();
			buff.close();
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/coos.js")
	public void coosJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSJSContent(false);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outJS(response, content);
	}

	@RequestMapping("/coos.min.js")
	public void coosMinJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSJSContent(true);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.min.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outJS(response, content);
	}

	@RequestMapping("/coos.css")
	public void coosCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSCSSContent(false);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outCSS(response, content);
	}

	@RequestMapping("/coos.min.css")
	public void coosMinCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSCSSContent(true);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.min.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outCSS(response, content);
	}

	@RequestMapping("/coos.page.js")
	public void coosPageJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSPageJSContent(false);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.page.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outJS(response, content);
	}

	@RequestMapping("/coos.page.min.js")
	public void coosPageMinJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSPageJSContent(true);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.page.min.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outJS(response, content);
	}

	@RequestMapping("/coos.page.css")
	public void coosPageCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSPageCSSContent(false);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.page.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outCSS(response, content);
	}

	@RequestMapping("/coos.page.min.css")
	public void coosPageMinCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSPageCSSContent(true);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.page.min.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outCSS(response, content);
	}

	@RequestMapping("/coos.model.js")
	public void coosModelJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		outJS(response, getCOOSModelJSContent(false));
	}

	@RequestMapping("/coos.model.min.js")
	public void coosModelMinJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		outJS(response, getCOOSModelJSContent(true));
	}

	@RequestMapping("/coos.model.css")
	public void coosModelCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		outCSS(response, getCOOSModelCSSContent(false));
	}

	@RequestMapping("/coos.model.min.css")
	public void coosModelMinCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		outCSS(response, getCOOSModelCSSContent(true));
	}

	@RequestMapping("/coos.frame.js")
	public void coosFrameJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSFrameJSContent(false);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.frame.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outJS(response, content);
	}

	@RequestMapping("/coos.frame.min.js")
	public void coosFrameMinJS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSFrameJSContent(true);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "js/coos.frame.min.js";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outJS(response, content);
	}

	@RequestMapping("/coos.frame.css")
	public void coosThemeCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSFrameCSSContent(false);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.frame.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outCSS(response, content);
	}

	@RequestMapping("/coos.frame.min.css")
	public void coosFrameMinCSS(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {

		String content = getCOOSFrameCSSContent(true);
		String COOS_folder = COOS_AND_PLUGINS_RESOURCES_FOLDER + "coos/";
		String path = COOS_folder + "css/coos.frame.min.css";
		File file = new File(path);
		if (file == null || !file.isFile() || !FileTool.read(file).equals(content)) {

			FileTool.save(file, content);
		}
		outCSS(response, content);
	}

	public String getCOOSCSSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer();

		String coosCSSFolderPath = RESOURCES_FOLDER + "dist/css";

		appendFolderSubFile(buffer, new File(coosCSSFolderPath));

		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.CSS));
		}

		return buffer.toString();
	}

	public String getCOOSJSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer("(function(window, jQuery) {");
		buffer.append("\n");

		String coosJSFolderPath = RESOURCES_FOLDER + "dist/js";

		appendFolderSubFile(buffer, new File(coosJSFolderPath));
		buffer.append("\n");
		buffer.append("})(window, jQuery);");

		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.JS));
		}

		return buffer.toString();
	}

	public String getCOOSPageJSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer("(function(window, jQuery, co) {");
		buffer.append("\n");
		String coosJSFolderPath = RESOURCES_FOLDER + "dist/page/js";
		appendFolderSubFile(buffer, new File(coosJSFolderPath));
		buffer.append("\n");
		buffer.append("})(window, jQuery, coos);");
		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.JS));
		}
		return buffer.toString();
	}

	public String getCOOSPageCSSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer();

		String coosCSSFolderPath = RESOURCES_FOLDER + "dist/page/css";
		appendFolderSubFile(buffer, new File(coosCSSFolderPath));
		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.CSS));
		}

		return buffer.toString();
	}

	public String getCOOSModelJSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer("(function(window, jQuery, co) {");
		buffer.append("\n");
		String coosJSFolderPath = RESOURCES_FOLDER + "dist/model/js";
		appendFolderSubFile(buffer, new File(coosJSFolderPath));
		buffer.append("\n");
		buffer.append("})(window, jQuery, coos);");
		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.JS));
		}
		return buffer.toString();
	}

	public String getCOOSModelCSSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer();

		String coosCSSFolderPath = RESOURCES_FOLDER + "dist/model/css";
		appendFolderSubFile(buffer, new File(coosCSSFolderPath));
		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.CSS));
		}

		return buffer.toString();
	}

	public String getCOOSFrameCSSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer();

		String coosCSSFolderPath = RESOURCES_FOLDER + "dist/frame/css";
		appendFolderSubFile(buffer, new File(coosCSSFolderPath));
		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.CSS));
		}

		return buffer.toString();
	}

	public String getCOOSFrameJSContent(boolean ismin) {

		StringBuffer buffer = new StringBuffer("(function(window, jQuery ,co) {");
		buffer.append("\n");
		String coosJSFolderPath = RESOURCES_FOLDER + "dist/frame/js";
		appendFolderSubFile(buffer, new File(coosJSFolderPath));
		buffer.append("\n");
		buffer.append("})(window, jQuery, coos);");
		if (ismin) {
			buffer = new StringBuffer(CompressorTool.compressor(buffer.toString(), CompressorTool.Type.JS));
		}
		return buffer.toString();
	}

	public void appendFolderSubFile(StringBuffer buffer, File folderFile) {

		if (folderFile != null && folderFile.isDirectory()) {
			File[] files = folderFile.listFiles();

			String indexPath = folderFile.getAbsolutePath() + "/index.css";
			File indexFile = new File(indexPath);
			if (indexFile != null && indexFile.isFile()) {
				String content = FileTool.read(indexFile);
				buffer.append(content);
				buffer.append("\n");
			}
			indexPath = folderFile.getAbsolutePath() + "/index.js";
			indexFile = new File(indexPath);
			if (indexFile != null && indexFile.isFile()) {
				String content = FileTool.read(indexFile);
				buffer.append(content);
				buffer.append("\n");
			}

			ArrayHelper.sortACS(files);
			for (File file : files) {
				if (file.isFile() && file.getName().indexOf("index.js") != 0 && file.getName().indexOf("index.css") != 0) {
					buffer.append(FileTool.read(file));
					buffer.append("\n");
				}
			}
			for (File file : files) {
				if (file.isDirectory()) {
					appendFolderSubFile(buffer, file);
				}
			}
		}
	}
}