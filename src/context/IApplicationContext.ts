import IBeanFactory from '../beans/factory/IBeanFactory';
import IEnvironmentCapable from '../env/IEnvironmentCapable';

interface IApplicationContext extends IBeanFactory, IEnvironmentCapable {

}

export default IApplicationContext;