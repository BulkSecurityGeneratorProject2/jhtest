package hu.bme.dipterv.client.wicket;

import org.apache.wicket.Page;
import org.apache.wicket.authroles.authentication.AbstractAuthenticatedWebSession;
import org.apache.wicket.authroles.authentication.AuthenticatedWebApplication;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.spring.injection.annot.SpringComponentInjector;

import hu.bme.dipterv.client.wicket.components.musicapp.band.viewer.BandViewer;
import hu.bme.dipterv.client.wicket.pages.MainPage;
import hu.bme.dipterv.client.wicket.pages.article.ArticlePage;
import hu.bme.dipterv.client.wicket.pages.home.HomePage;
import hu.bme.dipterv.client.wicket.pages.musicapp.MusicAppPage;

/**
 * Application object for your web application.
 * If you want to run this application without deploying, run the Start class.
 * 
 * @see hu.bme.dipterv.Start#main(String[])
 */
public class WicketApplication extends AuthenticatedWebApplication
{
	@Override
    public Class<? extends Page> getHomePage()
    {
        return HomePage.class;
    }

    @Override
    protected Class<? extends AbstractAuthenticatedWebSession> getWebSessionClass()
    {
        return WicketAuthenticatedWebSession.class;
    }

    @Override
    protected Class<? extends WebPage> getSignInPageClass()
    {
        return SignInPage.class;
    }

    @Override
    protected void init()
    {
        super.init();
        getDebugSettings().setDevelopmentUtilitiesEnabled(true);
		getComponentInstantiationListeners().add(new SpringComponentInjector(this));
		
		// Mountolás, hogy szép url-en lehessen elérni az oldalakat
		mountPage("/home", HomePage.class);
		mountPage("/articles", ArticlePage.class);
		mountPage("/musicapp", MusicAppPage.class);
    }
}
