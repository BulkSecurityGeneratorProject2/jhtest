package hu.bme.dipterv.client.wicket.components.user;

import org.apache.wicket.Session;
import org.apache.wicket.authroles.authentication.panel.SignInPanel;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.StatelessLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.Model;

import hu.bme.dipterv.client.wicket.WicketAuthenticatedWebSession;

public class UserPanel extends Panel {

	public UserPanel(String id) {
		super(id);
		
		Model<String> welcomeModel = Model.of("");
		Label label = new Label("lblLoginStatus", welcomeModel);
		add(label);
		
		// Action link counts link clicks on works with onclick handler
		StatelessLink<Void> actionOnClickLink = new StatelessLink<Void>("linkLogout")
        {
			private static final long serialVersionUID = 1L;

			@Override
            public void onClick() {
            	Session.get().invalidate();
            	setResponsePage(getPage().getClass());
            }
        };
        add(actionOnClickLink);
        
        SignInPanel signInPanel = new SignInPanel("signInPanel");
		add(signInPanel);
		
		WicketAuthenticatedWebSession session = (WicketAuthenticatedWebSession) Session.get();
		
		if(session.isSignedIn()) {
			signInPanel.setVisible(false);
			actionOnClickLink.setVisible(true);
			welcomeModel.setObject("Signed in " + session.getRoles());
		} else {
			signInPanel.setVisible(true);
			actionOnClickLink.setVisible(false);
			welcomeModel.setObject("Not signed in");
		}
	}

}
